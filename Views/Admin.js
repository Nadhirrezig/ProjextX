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
////////////////////////////////////////////////////////////////// Controlling the overview \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function loadOverviewSection() {
    document.querySelector("main").innerHTML = `
        <div class="overview">
        <div class="summury">
            <div class="revenue_orders">
                <div class="revenue">
                    <h4>Total Revenue</h4>
                    <h2>$400</h2>
                </div>
                <div class="orders">
                    <h4>Total Orders</h4>
                    <h2>200</h2>
                </div>
            </div>
            <div class="status">
                <p>Chart Placeholder (Lhne chin7oto chart librarie)</p>
            </div>
            <div class="lastorders">
                <h4>Last Orders</h4>
                <table id="orders-table">
                    <thead>
                        <tr>
                            <th>Table</th>
                            <th>Time</th>
                            <th>Track</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#54</td>
                            <td>12:00 PM</td>
                            <td>Pending</td>
                            <td>50DT</td>
                        </tr>
                        <tr>
                            <td>#31</td>
                            <td>12:30 PM</td>
                            <td>Completed</td>
                            <td>30DT</td>
                        </tr>
                        <tr>
                            <td>#36</td>
                            <td>1:00 PM</td>
                            <td>Pending</td>
                            <td>70DT</td>
                        </tr>
                        <tr>
                            <td colspan="4" style="text-align: center;">No More Orders</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="trending-products">
            <h4>Trending Products</h4>
            <ol>
                <li>Espresso</li>
                <li>Cappuccino</li>
                <li>Pizza</li>
            </ol>
        </div>
    </div>
    `;
}
////////////////////////////////////////////////////////////////// CONTROLLING THE employees \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function loadEmployeeSection() {
    document.querySelector("main").innerHTML = `
        <div class="employee-management">
            <div class="employee-form-container">
                <h2>Add New Employee</h2>
                <form id="employee-form" onsubmit="addEmployee(event)" >
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Enter employee name" required>
                    
                    <label for="role">Role:</label>
                    <input type="text" id="role" name="role" placeholder="Enter employee role" required>
                    
                    <label for="contact">Contact:</label>
                    <input type="tel" id="contact" name="contact" maxlength="8" minlength="8" placeholder="Enter phone number" required>
                    
                    <label for="status">Status:</label>
                    <select id="status" name="status" required>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    
                    <label for="salary">Salary:</label>
                    <input type="number" id="salary" name="salary" placeholder="Enter salary" min="0">
                    
                    <div class="form-buttons">
                        <button type="submit">Submit</button>
                        <button type="reset">Clear</button>
                    </div>
                </form>
            </div>
            <h1>Employees</h1>
            <div class="employee-section">
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
let employees = JSON.parse(localStorage.getItem("employement")) || [];
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
    save();
    loadEmployees();
    document.getElementById("employee-form").reset();
}
function save(){
    localStorage.setItem("employement", JSON.stringify(employees));
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
    
    if (!employee) {
        console.error("Employee not found");
        return;
    }


    document.getElementById("name").value = employee.name || "";
    document.getElementById("role").value = employee.role || "";
    document.getElementById("contact").value = employee.contact || "";
    document.getElementById("salary").value = employee.salary || 0;


    const form = document.getElementById("employee-form");
    form.onsubmit = function (event) {
        event.preventDefault();


        employee.name = document.getElementById("name").value;
        employee.role = document.getElementById("role").value;
        employee.contact = document.getElementById("contact").value;
        employee.status = document.getElementById("status").value;
        employee.salary = parseInt(document.getElementById("salary").value) || 0;

        save();
        loadEmployees();

        form.onsubmit = addEmployee;
        form.reset();
    };
}
function deleteEmployee(id) {
    employees = employees.filter((emp) => emp.id !== id);
    save();
    loadEmployees();
}

////////////////////////////////////////////////////////////////// managing the recent activitie \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function loadRecentActivitySection() {
    document.querySelector("main").innerHTML = `
        <div id="recent-activity" class="activity-section">
            <h1>Recent Activity</h1>
            <ul id="activity-list"></ul>
        </div>
    `;
    const socket = io();
    socket.off("activity");
    socket.on("activity", (loginData) => {
        console.log("Received activity data:", loginData);
        updateRecentActivityUI(loginData);
    });
}

function updateRecentActivityUI(loginData) {
    const activityList = document.querySelector('#activity-list');
    if (activityList) {
        const newActivity = document.createElement('li');
        newActivity.innerHTML = `
            <p>IP: ${loginData.Ip_address}</p>
            <p>Time: ${new Date(loginData.timestamp).toLocaleString()}</p>
        `;
        activityList.appendChild(newActivity);
    }
}

////////////////////////////////////////////////////////////////// Reports\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function loadReportsSection() {
    history.pushState({ recentActivity: true }, "", "/recent-activity");
    document.querySelector("main").innerHTML = `
        <div class="reports-section">
            <h1>Reports</h1>
            <p>reports will appear here.</p>
        </div>
    `;
}
////////////////////////////////////////////////////////////////// managing orders||for admin && employess|| \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

