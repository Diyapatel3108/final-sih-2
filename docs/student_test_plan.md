# Student Role Functionality Test Plan

This document outlines the test plan for validating the functionality of the student role in the application.

## 1. Dashboard

*   **Objective:** Verify that the student dashboard displays the correct information for the logged-in student.
*   **Test Steps:**
    1.  Log in as a student.
    2.  Navigate to the dashboard.
    3.  Verify that the student's name, department, and RFID ID are displayed correctly.
    4.  Verify that the student's avatar is displayed correctly.
    5.  Verify that the student's "scholar level" is displayed correctly.
    6.  Verify that the "Today's Lectures" section displays the correct information for the student's classes.

## 2. My Activity

*   **Objective:** Verify that the "My Activity" page displays the correct information and that the functionality is working correctly.
*   **Test Steps:**
    1.  Log in as a student.
    2.  Navigate to the "My Activity" page.
    3.  Verify that the curriculum and non-curriculum activities are displayed correctly.
    4.  Select a curriculum activity and verify that the correct sub-activities are displayed.
    5.  Select a coding activity and verify that the correct coding languages are displayed.
    6.  Select a coding language and verify that the correct YouTube video and notes are displayed.
    7.  Verify that the "Download Notes" button downloads the correct notes as a PDF.

## 3. Attendance

*   **Objective:** Verify that the "Attendance" page displays the correct attendance information for the logged-in student.
*   **Test Steps:**
    1.  Log in as a student.
    2.  Navigate to the "Attendance" page.
    3.  Verify that the summary stats, weekly report, and overall attendance chart display the correct information.
    4.  Verify that the subject-wise attendance tab displays the correct information.
    5.  Verify that the day-wise attendance tab displays the correct information when a date is selected.

## 4. Notifications

*   **Objective:** Verify that the "Notifications" page displays the correct notifications for the logged-in student.
*   **Test Steps:**
    1.  Log in as a student.
    2.  Navigate to the "Notifications" page.
    3.  Verify that the correct notifications are displayed.

## 5. Profile

*   **Objective:** Verify that the "Profile" page displays the correct information for the logged-in student.
*   **Test Steps:**
    1.  Log in as a student.
    2.  Navigate to the "Profile" page.
    3.  Verify that the student's name, ID, department, and contact number are displayed correctly.
    4.  Verify that the student's avatar is displayed correctly.

## 6. QR Scanner

*   **Objective:** Verify that the "QR Scanner" is working correctly.
*   **Test Steps:**
    1.  Log in as a student.
    2.  Navigate to the "QR Scanner" page.
    3.  Verify that the camera is activated and that the scanner is able to scan a QR code.
    4.  Verify that a valid QR code is correctly processed and that the attendance is marked.
    5.  Verify that an invalid QR code is handled correctly and that an appropriate error message is displayed.