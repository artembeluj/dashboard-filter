Angular Project Documentation

Project Structure
The project is organized into the following main directories:

1. core
This directory houses essential services for the application.

2. pages
The pages directory contains the primary application pages. Currently, it includes:

a. dashboard
The dashboard page is composed of two main components:

- dashboard-filters
This component is responsible for rendering and managing the filters on the dashboard. The filters include options for name, category, and price range. The name and category filters are implemented using custom value accessors for better code organization.

Unit Tests:
Unit tests for this component are available to ensure the correct functionality of the filters.

- dashboard-table
The dashboard-table component is responsible for displaying data in a tabular format. It receives data and renders it using Angular Material components, providing a visually appealing and user-friendly table.

3. shared
The shared directory holds common interfaces and constants used throughout the application.

Architecture and Performance
The application follows the stand-alone architecture, emphasizing modularity and separation of concerns.

ChangeDetectionStrategy.OnPush has been applied to optimize performance by reducing unnecessary change detection cycles.

Running the Project
To run the project, execute the following command: ng serve

This will start the development server, and you can access the application at http://localhost:4200/.

Testing
The application has been thoroughly tested using Angular DevTools. Additionally, unit tests have been implemented for components, including the dashboard-filters component.