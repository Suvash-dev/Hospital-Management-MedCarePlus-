        // Doctor database map
        const doctorsData = {
            cardiology: [
                "Dr. Robert Chen (Chief Cardiologist)",
                "Dr. Sarah Jenkins (Interventional Cardiology)",
                "Dr. Michael Vance (Electrophysiology)"
            ],
            neurology: [
                "Dr. Amanda Ross (Head of Neurology)",
                "Dr. David Miller (Neuro-Oncology)",
                "Dr. Elena Rostova (Stroke Specialist)"
            ],
            orthopedics: [
                "Dr. James Wilson (Joint Replacement)",
                "Dr. Marcus Brody (Sports Medicine)",
                "Dr. Claire Bennet (Spine Specialist)"
            ],
            pediatrics: [
                "Dr. Emily Watson (Pediatric Chief)",
                "Dr. Alan Grant (Neonatology)"
            ]
        };

        // Update Doctor Dropdown based on chosen department
        function updateDoctors() {
            const dept = document.getElementById('departmentSelect').value;
            const docSelect = document.getElementById('doctorSelect');
            
            docSelect.innerHTML = '<option value="" selected disabled>Select Doctor...</option>';
            
            if (doctorsData[dept]) {
                docSelect.disabled = false;
                doctorsData[dept].forEach(doc => {
                    const opt = document.createElement('option');
                    opt.value = doc;
                    opt.textContent = doc;
                    docSelect.appendChild(opt);
                });
            } else {
                docSelect.disabled = true;
            }
        }

        // Open Accreditation Modal
        function openCertModal(title, category, validity, code) {
            document.getElementById('modalCertName').innerText = title;
            document.getElementById('modalCertCategory').innerText = category;
            document.getElementById('modalCertValidity').innerText = validity;
            document.getElementById('modalCertCode').innerText = "Cert ID: " + code;
            
            const certModal = new bootstrap.Modal(document.getElementById('certModal'));
            certModal.show();
        }

        // Handle Appointment Form Submission
        function handleAppointmentSubmit(event) {
            event.preventDefault();

            const name = document.getElementById('patientName').value;
            const doctor = document.getElementById('doctorSelect').value;
            const date = document.getElementById('appointmentDate').value;

            // Generate Random Reference Code
            const refCode = "#MC-" + Math.floor(100000 + Math.random() * 900000);

            document.getElementById('ticketRef').innerText = refCode;
            document.getElementById('ticketName').innerText = name;
            document.getElementById('ticketDoctor').innerText = doctor;
            document.getElementById('ticketDate').innerText = date;

            // Display Ticket Modal
            const ticketModal = new bootstrap.Modal(document.getElementById('ticketModal'));
            ticketModal.show();

            // Reset form
            event.target.reset();
            document.getElementById('doctorSelect').disabled = true;
        }

        // Handle General Enquiry
        function handleGeneralEnquiry(event) {
            event.preventDefault();
            alert("Thank you! Your inquiry has been logged. Our hospital helpdesk will contact you shortly.");
            event.target.reset();
        }
   

        // doctor select auto

        

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);

    const department = params.get("department");
    const doctor = params.get("doctor");

    const departmentSelect = document.getElementById("departmentSelect");
    const doctorSelect = document.getElementById("doctorSelect");

    if (!departmentSelect || !doctorSelect) {
        return;
    }

    if (department) {

        // Set Department
        departmentSelect.value = department;

        // Trigger the existing updateDoctors() function
        departmentSelect.dispatchEvent(new Event("change"));

        // Set Doctor after the department's doctor options load
        if (doctor) {
            const matchingDoctor = Array.from(doctorSelect.options)
                .find(option => option.value === doctor);

            if (matchingDoctor) {
                doctorSelect.value = doctor;
            }
        }
    }

});
