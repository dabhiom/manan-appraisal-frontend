// 20 predefined FAQ entries related to the employee dashboard analytics
// questions can easily be extended by editing this array.

export const faq = [
  { question: "What is the average salary?", answer: "The average salary is calculated across all employees and displayed on the dashboard summary." },
  { question: "How many employees are there?", answer: "You can see the total number of employees at the top of the employee table or in the summary section." },
  { question: "How do I filter by department?", answer: "Use the department dropdown above the table to filter employees by department." },
  { question: "Can I sort employees by grade?", answer: "Yes, click on the grade column header to toggle ascending/descending order." },
  { question: "What counts as invalid data?", answer: "Invalid data includes entries with missing or improperly formatted required fields." },
  { question: "Where can I export employee data?", answer: "Use the export button on the dashboard to download CSV or Excel files." },
  { question: "How do I add a new user?", answer: "Click the 'Add User' button in the user management section and fill in the form." },
  { question: "Who can change permissions?", answer: "Only HR admins with appropriate roles can modify user permissions." },
  { question: "Can I reset a user's password?", answer: "Yes, open the user menu and choose the 'Reset Password' option." },
  { question: "What departments exist?", answer: "Departments are dynamically listed based on the data in the system, and can include Sales, Engineering, HR, etc." },
  { question: "How do I view invalid entries?", answer: "Toggle the 'Show Invalid' switch or navigate to the Invalid Data page to review them." },
  { question: "Is there a quick way to delete employees?", answer: "Select rows in the table and use the delete button, or use context menu actions." },
  { question: "How do I change my password?", answer: "Open the change password form accessible from your user menu." },
  { question: "What is the grade distribution?", answer: "The grade distribution is shown on the pie/ bar charts for quick analytics." },
  { question: "Can I view metrics over time?", answer: "Current implementation shows snapshot data; time-based analytics may be coming soon." },
  { question: "How are weights used in calculations?", answer: "Weights affect the appraisal scores and are configurable per metric." },
  { question: "Where can I see export history?", answer: "Export history is not shown in the UI yet; check backend logs or future releases." },
  { question: "What happens after deleting an employee?", answer: "Deleted entries are buffered for 5 seconds before final removal, allowing undo." },
  { question: "Who can access the dashboard?", answer: "Only authenticated users with proper roles (HR/admin) can access the dashboard." },
  { question: "How is invalid data fixed?", answer: "Edit the entry directly from the invalid data page or notify the data owner for correction." },
];
