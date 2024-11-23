let barWidth = document.getElementById("sidebar");
let DocWidth = document.getElementsByTagName("body")[0];
let main = document.getElementsByTagName("main")[0];

////////////////////////////////////////////////////////////////// CONTROLLING THE SIDENAVBAR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function openNav() {
  
    if (barWidth.style.width === "" || barWidth.style.width === "0px") {
       
        barWidth.classList.add("show");
       
        DocWidth.style.marginLeft = "250px"; 
        main.style.filter = "blur(4px)";
        main.style.pointerEvents = "none"; 
        main.style.userSelect = "none";
        if (window.innerWidth <= 800) {
            document.getElementById("header").classList.add("hide-header");
        }
    } else {
        closeNav();
    }
}

function closeNav() {

    barWidth.classList.remove("show");
    main.style.userSelect = "auto"; 
    main.style.pointerEvents = "auto"; 
    DocWidth.style.marginLeft = "0px"; 
    main.style.filter = "none";
    if (window.innerWidth <= 800) {
        document.getElementById("header").classList.remove("hide-header");
    }
}
////////////////////////////////////////////////////////////////// CONTROLLING THE menu \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////// dashboard on click
function loadmain(){
    const main = `
            <div class="main-content">
                <section class="card" onclick="loadOverviewSection()">
                    <button>Overview</button>
                </section>
                <section class="card" onclick="loadEmployeeSection()">
                    <button>Managing Employment</button>
                </section>
                <section class="card" onclick="loadRecentActivitySection()">
                    <button>Recent Activity</button>
                </section>
                <section class="card" onclick="loadReportsSection()">
                    <button>Reports</button>
                </section>
            </div>
    `;
    if(document.querySelector("main").innerHTML !== main){
        document.querySelector("main").innerHTML = main;
        setTimeout(()=>{
            closeNav();
        },500);
        
    }
}
////////////////////////////////////////////////////////////////// Controlling the overview \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function loadOverviewSection() {
    document.querySelector("main").innerHTML = `
        <div class="overview-section">
            <h1>Overview</h1>
            <p>Summary of the dashboard activity goes here.</p>
        </div>
    `;
}
////////////////////////////////////////////////////////////////// CONTROLLING THE employees \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function loadEmployeeSection() {
    document.querySelector("main").innerHTML = `
        <div class="employee-management">
            <div class="employee-form-container">
                <h2>Add New Employee</h2>
                <form id="employee-form" onsubmit="addEmployee(event)">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Enter employee name" required>
                    
                    <label for="role">Role:</label>
                    <input type="text" id="role" name="role" placeholder="Enter employee role" required>
                    
                    <label for="contact">Contact:</label>
                    <input type="tel" id="contact" name="contact" maxlength="8" placeholder="Enter phone number" required>
                    
                    <label for="status">Status:</label>
                    <select id="status" name="status" required>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    
                    <label for="salary">Salary:</label>
                    <input type="number" id="salary" name="salary" placeholder="Enter salary" min="0">
                    
                    <div class="form-buttons">
                        <button type="submit">Add Employee</button>
                        <button type="reset">Clear</button>
                    </div>
                </form>
            </div>
            <div class="employee-section">
                <h1>Employees</h1>
                <table id="employee-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7" style="text-align: center;">No employees yet</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    loadEmployees();
}

let employees = [];

function addEmployee(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const contact = document.getElementById("contact").value;
    const status = document.getElementById("status").value;
    const salary = document.getElementById("salary").value;

    const newEmployee = {
        id: employees.length + 1,
        name,
        role,
        contact,
        status,
        salary,
    };

    employees.push(newEmployee);
    loadEmployees();
    document.getElementById("employee-form").reset();
}

function loadEmployees() {
    const tableBody = document.querySelector("#employee-table tbody");
    tableBody.innerHTML = "";

    if (employees.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center;">No employees yet</td>
            </tr>
        `;
        return;
    }

    employees.forEach((employee) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>${employee.contact}</td>
            <td>${employee.status}</td>
            <td>${employee.salary}</td>
            <td>
                <button onclick="editEmployee(${employee.id})">Edit</button>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editEmployee(id) {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
        if (newName) {
            employee.name = newName;
        }
        if (newRole) {
            employee.role = newRole;
        }
        if (newContact) {
            employee.contact = newContact;
        }
        if (newStatus) {
            employee.status = newStatus;
        }
        if (newSalary) {
            employee.salary = newSalary;
        }
        loadEmployees();
    }
}

function deleteEmployee(id) {
    employees = employees.filter((emp) => emp.id !== id);
    loadEmployees();
}

////////////////////////////////////////////////////////////////// managing the recent activitie \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function loadRecentActivitySection() {
    document.querySelector("main").innerHTML = `
        <div class="activity-section">
            <h1>Recent Activity</h1>
            <ul>
                <li>User logged in</li>
                <li>Order #123 processed</li>
                <li>Employee John Doe added</li>
            </ul>
        </div>
    `;
}

////////////////////////////////////////////////////////////////// Reports\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function loadReportsSection() {
    document.querySelector("main").innerHTML = `
        <div class="reports-section">
            <h1>Reports</h1>
            <p>Detailed analytics and reports will appear here.</p>
        </div>
    `;
}
////////////////////////////////////////////////////////////////// managing orders||for admin && employess|| \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

