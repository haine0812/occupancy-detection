# Occupancy Detection

## How to run

### Requirements

- Node v20.5.1: [Download](https://nodejs.org/en/blog/release/v20.5.1)
- Python 3.11.3: [Download](https://www.python.org/downloads/release/python-3113/)
- Windows 10 or 11

### Installation

- **Step 1:** Create virtual environment (you can step this step actually, it's just for the development):
    - Open the terminal, go to the project:
    - Run this command:
    ```
    py -m venv ./venv

    ./venv/Scripts/activate
    ```
    - The folder venv will be created, and you will be in the virtual environment, then run this command:
    ```
    pip install -r requirements.txt
    ```
- **Step 2:** Install node modules for the web:
    From the root path of the project, run these commands in the terminal:
    ```
    cd frontend

    npm run dev
    ```
- **Step 3:** Run the back-end:
    From the root path of the project, run these commands in the terminal:
    ```
    py app.py
    ```
- **Step 4:** Open the web browser and go to http://localhost:3000