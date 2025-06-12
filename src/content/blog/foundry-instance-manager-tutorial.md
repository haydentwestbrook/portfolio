---
title: "Build Your Own Multiverse: A Step-by-Step Guide to Creating the Foundry Instance Manager (FIM)"
description: "Learn how to build a powerful command-line tool for managing multiple Foundry VTT instances using Docker containers. This comprehensive guide walks you through creating a robust, extensible solution for your virtual tabletop needs."
pubDate: 2024-06-12T00:00:00.000Z
author: "Hayden"
image: "/foundry-instance-manager-tutorial.png"
tags: ["tutorial", "python", "docker", "foundry-vtt", "cli"]
---

Build Your Own Multiverse: A Step-by-Step Guide to Creating the Foundry Instance Manager (FIM)
Are you tired of juggling multiple Foundry VTT campaigns, each with its own quirks, versions, or module dependencies? Imagine a world where you can effortlessly spin up a new game, migrate a classic campaign, or simply manage all your virtual tabletops from a single, intuitive command line. That world is within reach, and with this tutorial, you're going to build the tool that brings it to life: the Foundry Instance Manager (FIM).

FIM is a command-line interface (CLI) application designed to tame the chaos of multiple Foundry VTT instances by leveraging the power of Docker containers. By following this step-by-step guide, you'll learn how to construct a robust, extensible tool that makes managing your Foundry multiverse a breeze.

Prerequisites: Your Toolkit for Creation
Before we dive into the code, make sure you have the following essentials set up on your system:

Python 3.x installed: FIM is built with Python, so ensure you have a recent version (3.8+) ready to go. You can check this by running python3 --version in your terminal.
Docker installed and running: Docker is the containerization engine that makes FIM's magic happen. Download and install Docker Desktop for your operating system (Windows, macOS) or the Docker Engine for Linux. Crucially, ensure the Docker daemon is actively running.
Basic understanding of Python and Docker: While this tutorial is comprehensive, a foundational grasp of Python syntax and core Docker concepts (like images, containers, and volumes) will make the journey smoother.
Git for version control: Although not strictly required for this build, using Git is highly recommended for tracking your changes and managing your project.
Step 1: Project Setup – Laying the Foundation
Every great project starts with a solid foundation. In this step, we'll create the necessary directories and files, and set up our Python environment to keep things organized.

Create Your Project Directory and Virtual Environment
First, open your terminal and create the main project directory. Then, navigate into it:

```bash
mkdir foundry-instance-manager
cd foundry-instance-manager
```

Next, it's crucial to create a Python virtual environment. This isolates your project's dependencies from your system's global Python packages, preventing conflicts and keeping your project clean.

```bash
python -m venv venv
```

Now, activate your virtual environment. The command differs slightly based on your operating system:

On macOS/Linux:
```bash
source venv/bin/activate
```

On Windows (Command Prompt):
```bash
venv\Scripts\activate.bat
```

On Windows (PowerShell):
```powershell
.\venv\Scripts\Activate.ps1
```

You'll know it's active when you see (venv) at the beginning of your terminal prompt.

Build the Basic Project Structure
Good project structure is key for maintainability. We'll set up the main application directory, a dedicated folder for tests, and essential project files:

```bash
mkdir foundry_manager
mkdir tests
touch README.md
touch requirements.txt
touch setup.py
```

foundry_manager/: This will house all our Python source code for the FIM application.
tests/: This directory is where our unit and integration tests will live.
README.md: Your project's welcome mat, containing essential information for users and developers.
requirements.txt: Lists all the Python packages your project depends on.
setup.py: The build script for your Python package, allowing others (and yourself) to install FIM easily.
Define Your Dependencies in requirements.txt
Now, let's specify the external Python libraries FIM will rely on. Open requirements.txt and add the following:

```text
click>=8.0.0
docker>=6.0.0
rich>=10.0.0
pytest>=7.0.0
```

Create a Basic setup.py
The setup.py file is vital for defining your Python package. It tells Python how to install your project, its dependencies, and crucially, how to create a fim command that you can run directly from your terminal.

Open setup.py and add this code:

```python
from setuptools import setup, find_packages

setup(
    name="foundry-instance-manager",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "click>=8.0.0",
        "docker>=6.0.0",
        "rich>=10.0.0",
    ],
    entry_points={
        "console_scripts": [
            "fim=foundry_manager.cli:cli",
        ],
    },
)
```

Create the Docker Manager (foundry_manager/docker_manager.py)
The DockerManager is the direct link to your Docker daemon. It handles all the low-level tasks of creating, starting, stopping, and removing containers.

Create foundry_manager/docker_manager.py and paste the following code. This snippet includes basic setup, error handling, and the create_container method.

```python
#!/usr/bin/env python3

import docker
import logging
from pathlib import Path
from typing import Optional, List, Dict
from docker.models.containers import Container

logger = logging.getLogger("foundry-manager")

class DockerError(Exception):
    """Base exception for Docker-related errors."""
    pass

class ContainerNotFoundError(DockerError):
    """Raised when a container is not found."""
    pass

class DockerManager:
    def __init__(self, base_dir: Optional[Path] = None):
        self.base_dir = base_dir or Path.cwd()
        try:
            self.client = docker.from_env()
        except docker.errors.DockerException as e:
            raise DockerError("Docker is not running or not accessible") from e

    def create_container(self, name: str, image: str, environment: Optional[Dict[str, str]] = None, 
                            port: Optional[int] = None, volumes: Optional[Dict[str, Dict]] = None,
                            proxy_port: Optional[int] = None) -> Container:
        """Create a new Docker container."""
        try:
            ports = {
                '30000/tcp': port if port is not None else 30000
            }
            if proxy_port is not None:
                ports['443/tcp'] = proxy_port

            container = self.client.containers.run(
                image=image,
                name=name,
                detach=True,
                ports=ports,
                volumes=volumes or {},
                environment=environment or {},
                restart_policy={'Name': 'unless-stopped'}
            )
            return container
        except Exception as e:
            raise DockerError(str(e))

    # Add other methods: get_container, start_container, stop_container, remove_container
```

Create the Instance Record Manager (foundry_manager/instance_record_manager.py)
The InstanceRecordManager is FIM's memory. It's responsible for persisting information about your Foundry VTT instances so that FIM "remembers" them across sessions.

Create foundry_manager/instance_record_manager.py and add the following:

```python
import json
from pathlib import Path
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class InstanceRecord:
    name: str
    version: str
    data_dir: Path
    port: int
    status: str

class InstanceRecordManager:
    def __init__(self, base_dir: Path):
        self.base_dir = base_dir
        self.records_file = base_dir / "instance_records.json"
        self.records_file.parent.mkdir(parents=True, exist_ok=True)
        self._load_records()

    def _load_records(self):
        if self.records_file.exists():
            with open(self.records_file, 'r') as f:
                data = json.load(f)
                self.records = {
                    name: InstanceRecord(
                        name=name,
                        version=record['version'],
                        data_dir=Path(record['data_dir']),
                        port=record['port'],
                        status=record['status']
                    )
                    for name, record in data.items()
                }
        else:
            self.records = {}

    def _save_records(self):
        data = {
            name: {
                'version': record.version,
                'data_dir': str(record.data_dir),
                'port': record.port,
                'status': record.status
            }
            for name, record in self.records.items()
        }
        with open(self.records_file, 'w') as f:
            json.dump(data, f, indent=2)

    # Add methods: add_record, get_record, update_status, etc.
```

Create the Configuration Manager (foundry_manager/config.py)
The ConfigurationManager handles application-wide settings and default configurations for instances. This is where FIM decides where to store its data and where your Foundry VTT instances' data will live.

Create foundry_manager/config.py and add the following:

```python
#!/usr/bin/env python3

import json
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

CONFIG_FILE = "fim_config.json"

def load_config() -> dict:
    """Load configuration from the config file."""
    config_path = Path.home() / CONFIG_FILE
    
    if not config_path.exists():
        config = {
            'base_dir': str(Path.home() / 'foundry-instances'),
            'shared_dir': str(Path.home() / 'foundry-shared'),
            'instances': {}
        }
        save_config(config)
        return config
    
    with open(config_path, 'r') as f:
        return json.load(f)

def save_config(config: dict) -> None:
    """Save configuration to the config file."""
    config_path = Path.home() / CONFIG_FILE
    with open(config_path, 'w') as f:
        json.dump(config, f, indent=2)
```

Create the CLI Implementation (foundry_manager/cli.py)
The cli.py module is where the user interacts with FIM. It defines the commands you type into your terminal (fim create, fim list, etc.) and links them to the core logic we just built.

Create foundry_manager/cli.py and add the following code:

```python
#!/usr/bin/env python3

import click
from rich.console import Console
from pathlib import Path
# We'll need to create this file in the next steps as part of Instance Manager
from .foundry_instance_manager import FoundryInstanceManager 

console = Console()

@click.group()
def cli():
    """Foundry Instance Manager - Manage multiple Foundry VTT instances."""
    pass

@cli.command()
@click.argument('name')
@click.option('--version', help='Foundry VTT version')
@click.option('--port', type=int, default=30000, help='Port to use')
def create(name: str, version: str, port: int):
    """Create a new Foundry VTT instance."""
    try:
        manager = FoundryInstanceManager()
        instance = manager.create_instance(name, version, port)
        console.print(f"Created instance {name} (v{instance.version}) on port {instance.port}")
    except Exception as e:
        console.print(f"[red]Error: {e}[/red]")
        raise click.Abort()

# Add other commands: list, start, stop, remove, etc.

if __name__ == '__main__':
    cli()
```

Create Test Files
Inside your tests/ directory, create empty Python files for each manager you want to test:

```bash
touch tests/test_docker_manager.py
touch tests/test_instance_record.py
touch tests/test_cli.py
```

Example Test File (tests/test_docker_manager.py)
Let's write a simple test for our DockerManager's create_container method using pytest and unittest.mock for isolating dependencies.

Open tests/test_docker_manager.py and add the following:

```python
import pytest
from unittest.mock import patch, MagicMock
from foundry_manager.docker_manager import DockerManager, ContainerNotFoundError, DockerError

@pytest.fixture
def mock_docker_client():
    """Fixture to mock the Docker client."""
    with patch('docker.from_env') as mock:
        client = mock.return_value
        yield client

@pytest.fixture
def docker_manager(mock_docker_client):
    """Fixture to create a DockerManager instance with a mocked client."""
    return DockerManager()

def test_create_container_success(docker_manager, mock_docker_client):
    """Test successful container creation."""
    mock_container = MagicMock()
    mock_container.id = "test-container-id"
    mock_container.status = "created"
    mock_docker_client.containers.run.return_value = mock_container

    container = docker_manager.create_container(
        name="test-container",
        image="test-image:latest",
        port=30000
    )

    assert container == mock_container
    assert container.id == "test-container-id"
    assert container.status == "created"
    mock_docker_client.containers.run.assert_called_once_with(
        image="test-image:latest",
        name="test-container",
        detach=True,
        ports={'30000/tcp': 30000},
        volumes={},
        environment={},
        restart_policy={'Name': 'unless-stopped'}
    )

def test_create_container_docker_error(docker_manager, mock_docker_client):
    """Test DockerError is raised on container creation failure."""
    mock_docker_client.containers.run.side_effect = docker.errors.APIError("Test API Error", response=MagicMock())

    with pytest.raises(DockerError, match="Test API Error"):
        docker_manager.create_container(
            name="fail-container",
            image="bad-image:latest"
        )
```

Install the Package in Development Mode
Navigate back to your project's root directory (where setup.py is located) in your terminal. Ensure your virtual environment is still active.

```bash
pip install -e .
```

Run Tests
Now, let's run the test we just wrote.

```bash
pytest tests/
```

Create a .gitignore
When working with Git, you want to avoid committing temporary files, Python bytecode, virtual environment files, and build artifacts. Create a .gitignore file in your project's root directory and add the following:

```text
venv/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
```

Step 6: Documentation – Your Project's Story
Documentation is crucial for any project, especially for a CLI tool. A good README.md file serves as the entry point for users, explaining what the tool does, how to install it, and how to use it.

Create a Comprehensive README.md
Open README.md in your project's root directory and populate it with the following Markdown content. This provides a starting point for your user documentation.

Markdown

# Foundry Instance Manager (FIM)

A command-line tool for managing multiple Foundry VTT instances using Docker.

## Installation

```bash
pip install foundry-instance-manager
Usage
Create a new instance:

Bash

fim create my-instance --version 11.0.0 --port 30000
List instances:

Bash

fim list
Start/stop instances:

Bash

fim start my-instance
fim stop my-instance
Configuration
FIM uses a configuration file located at ~/.fim_config.json...


**Explanation:**
* **Clear Title and Description**: Immediately tells users what FIM is.
* **Installation Instructions**: Provides the `pip install` command (though currently we're using `pip install -e .` for development, this will be for later distribution).
* **Usage Examples**: Demonstrates common commands with clear syntax, making it easy for users to get started.
* **Configuration Section**: A placeholder to explain where the `fim_config.json` file is and what it contains. As FIM grows, you'll expand this section.

---

### Step 7: Iterative Development – Building Incrementally

Software development is rarely a one-shot process. It's an iterative cycle of building, testing, and refining. This step outlines the philosophy behind FIM's development.

#### Implement Core Functionality First

As you've seen, we started with the absolute necessities:
* **Basic Docker operations**: The `DockerManager` can create containers.
* **Instance management**: We have a concept of `InstanceRecord` and a manager to save them.
* **Configuration handling**: The `config.py` can load and save settings.
* **CLI implementation**: The `cli.py` has a basic `create` command.

This "minimum viable product" approach allows you to get a working core quickly.

#### Add Features Incrementally

Once the core is stable, you expand. For FIM, this would involve:
* **Version management**: Implementing logic to handle different `felddy/foundryvtt` image tags.
* **Configuration file support**: Expanding `config.py` to handle more complex instance-specific settings.
* **Error handling**: Making error messages more informative and ensuring graceful exits.
* **User experience improvements**: Refining the CLI output, adding progress bars, and making commands even more intuitive.

#### Write Tests for Each Feature

For every new piece of functionality or every bug fix, you should write corresponding tests:
* **Unit tests**: For individual functions and methods.
* **Integration tests**: For how different components interact.
* **Error handling tests**: To ensure your error messages and recovery mechanisms work.

This ongoing testing strategy catches bugs early and builds confidence in your codebase.

#### Refine and Improve

Development isn't just about adding new code; it's also about making existing code better:
* **Code organization**: Continually evaluate if your modules and functions are logically grouped.
* **Error handling**: Can errors be caught earlier? Are the messages clearer?
* **User feedback**: Listen to what users (even yourself!) find frustrating or confusing about the CLI.
* **Documentation**: Keep your `README.md` and any other documentation up-to-date with new features and changes.

---

### Step 8: Distribution – Sharing Your Creation

Once FIM is robust enough, you might want to share it with others or install it more globally on your system. This involves packaging your Python application.

#### Build the Package

From your project's root directory, run:

```bash
python setup.py sdist bdist_wheel
sdist (source distribution): Creates a .tar.gz file containing your source code.
bdist_wheel (built distribution): Creates a .whl (wheel) file, which is a pre-built distribution that can be installed directly without recompilation, making installation faster for end-users.
These files will be created in a new dist/ directory within your project.

Upload to PyPI (Optional)
PyPI (the Python Package Index) is the official third-party software repository for Python. If you want others to be able to install FIM using pip install foundry-instance-manager, you can upload it there.

First, install twine, a utility for securely uploading packages:

Bash

pip install twine
Then, upload your package:

Bash

twine upload dist/*
You'll need a PyPI account and API token to do this. This step is completely optional, but it's how popular Python packages become widely available.

Best Practices: Building a Better FIM
As you continue to develop FIM, keep these best practices in mind to ensure your project remains high-quality and manageable.

Code Organization
Keep related functionality together: Group classes and functions that work closely together into the same modules.
Use clear, descriptive names: Variable, function, and class names should clearly indicate their purpose.
Follow Python style guidelines (PEP 8): Adhering to conventions like PEP 8 (e.g., snake_case for functions, PascalCase for classes) makes your code more readable and consistent.
Testing
Write tests for all features: Every new piece of functionality should be accompanied by tests.
Test error cases: Don't just test the "happy path." Ensure your code handles unexpected inputs or failures gracefully.
Maintain good test coverage: Aim for a high percentage of your code being covered by tests to catch as many potential issues as possible.
Documentation
Keep README up to date: As features change, so should your README.md.
Document all functions, classes, and complex logic: Use docstrings to explain what your code does, its parameters, and what it returns.
Provide usage examples: Show users how to use your tool with practical, runnable examples.
Error Handling
Use custom exceptions: As demonstrated, custom exceptions (like DockerError) provide more specific and useful error information.
Provide clear error messages: When an error occurs, the message should tell the user what happened and, ideally, how to fix it.
Handle cleanup properly: If an operation fails midway, ensure that any partially created resources (like Docker containers) are cleaned up to prevent orphaned assets.
User Experience
Clear command structure: Commands should be intuitive and follow a logical pattern (e.g., fim <action> <instance_name>).
Helpful error messages: Reiterate the importance of user-friendly errors.
Consistent output formatting: Use rich or similar tools to ensure all output from FIM looks professional and is easy to parse.
This tutorial provides a robust foundation for building the Foundry Instance Manager. You now have the initial project setup, core components, a basic CLI, and a testing framework in place. From here, you can continue to expand FIM, adding more commands, refining its logic, and tailoring it to your specific needs for managing your Foundry VTT multiverses!