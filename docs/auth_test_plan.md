# Authentication System Test Plan

This document outlines the test plan for validating the new centralized authentication system.

## 1. Login

*   **Objective:** Verify that users can log in with the correct credentials and are redirected to the correct dashboard.
*   **Test Steps:**
    1.  Log in as a student.
    2.  Verify that the user is redirected to the student dashboard.
    3.  Log out.
    4.  Log in as a teacher.
    5.  Verify that the user is redirected to the teacher dashboard.
    6.  Log out.
    7.  Log in as an administrator.
    8.  Verify that the user is redirected to the administrator dashboard.
    9.  Log out.
    10. Attempt to log in with incorrect credentials.
    11. Verify that an error message is displayed.

## 2. Access Control

*   **Objective:** Verify that users can only access the pages that they are authorized to access.
*   **Test Steps:**
    1.  Log in as a student.
    2.  Attempt to access the teacher dashboard.
    3.  Verify that access is denied.
    4.  Attempt to access the administrator dashboard.
    5.  Verify that access is denied.
    6.  Log out.
    7.  Log in as a teacher.
    8.  Attempt to access the student dashboard.
    9.  Verify that access is denied.
    10. Attempt to access the administrator dashboard.
    11. Verify that access is denied.
    12. Log out.
    13. Log in as an administrator.
    14. Attempt to access the student dashboard.
    15. Verify that access is denied.
    16. Attempt to access the teacher dashboard.
    17. Verify that access is denied.

## 3. Data Integrity

*   **Objective:** Verify that the correct data is displayed for the logged-in user.
*   **Test Steps:**
    1.  Log in as a student.
    2.  Navigate to the profile page.
    3.  Verify that the correct student information is displayed.
    4.  Navigate to the dashboard.
    5.  Verify that the correct dashboard information is displayed.
    6.  Log out.
    7.  Log in as a teacher.
    8.  Navigate to the profile page.
    9.  Verify that the correct teacher information is displayed.
    10. Navigate to the dashboard.
    11. Verify that the correct dashboard information is displayed.