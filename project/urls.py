"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from training_placement import views

urlpatterns = [
    
    path('index/', views.openLogin, name='login'),
    path('', views.openLogin, name='login'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='login'),
    path('web_logout/', views.webLogout, name='login'),

    # Admin

    path('admin_master/', views.adminMaster, name='admin_master'),
    path('add/admin_master/', views.add, name='admin_master'),
    path('update/admin_master/', views.update, name='admin_master'),
    path('delete/admin_master/', views.delete, name='admin_master'),
    path('get_data/admin_master/', views.getData, name='admin_master'),

    # Approved Papers

    path('approved/', views.approved, name='approved'),
    path('add/approved/', views.addApproved, name='approved'),
    path('update/approved/', views.updateApproved, name='approved'),
    path('delete/approved/', views.deleteApproved, name='approved'),
    path('get_data/approved/', views.getApprovedData, name='approved'),

    # Company

    path('company/', views.company, name='company'),
    path('add/company/', views.addCompany, name='company'),
    path('update/company/', views.updateCompany, name='company'),
    path('delete/company/', views.deleteCompany, name='company'),
    path('get_data/company/', views.getCompanyData, name='company'),


    # Placement

    path('placement/', views.placement, name='placement'),
    path('add/placement/', views.addPlacement, name='placement'),
    path('update/placement/', views.updatePlacement, name='placement'),
    path('delete/placement/', views.deletePlacement, name='placement'),
    path('get_data/placement/', views.getPlacementData, name='placement'),


    # Annual Placement

    path('annual_placement/', views.annual_placement, name='annual_placement'),
    # path('add/placement/', views.addPlacement, name='placement'),
    # path('update/placement/', views.updatePlacement, name='placement'),
    # path('delete/placement/', views.deletePlacement, name='placement'),
    path('get_data/annual_placement/', views.getAnnual_placementData, name='annual_placement'),

    # study material

    path('study/', views.study, name='study'),
    path('add/study/', views.addStudy, name='study'),
    path('update/study/', views.updateStudy, name='study'),
    path('delete/study/', views.deleteStudy, name='study'),
    path('get_data/study/', views.getStudyData, name='study'),

     # workshop details

    path('workshop/', views.workshop, name='workshop'),
    path('add/workshop/', views.addWorkshop, name='workshop'),
    path('update/workshop/', views.updateWorkshop, name='workshop'),
    path('delete/workshop/', views.deleteWorkshop, name='workshop'),
    path('get_data/workshop/', views.getWorkshopData, name='workshop'),

     # workshop details
    path('workshop_applied/', views.workshopApplied, name='workshop_applied'),
    path('delete/workshopApplied/', views.deleteWorkshopApplied, name='workshopApplied'),
    path('get_data/workshopApplied/', views.getworkshopAppliedData, name='workshopApplied'),

    # campus detials

    path('campus/', views.campus, name='campus'),
    path('add/campus/', views.addCampus, name='campus'),
    path('update/campus/', views.updateCampus, name='campus'),
    path('delete/campus/', views.deleteCampus, name='campus'),
    path('get_data/campus/', views.getCampusData, name='campus'),


    # news detials

    path('news/', views.news, name='news'),
    path('add/news/', views.addNews, name='news'),
    path('update/news/', views.updateNews, name='news'),
    path('delete/news/', views.deleteNews, name='news'),
    path('get_data/news/', views.getNewsData, name='news'),


    


    # Company url
    #Add job

    path('job/', views.job, name='job'),
    path('add/job/', views.addJob, name='job'),
    path('update/job/', views.updateJob, name='job'),
    path('delete/job/', views.deleteJob, name='job'),
    path('get_data/job/', views.getJobData, name='job'),
  
    # Job Applied details
    path('job_applied/', views.jobApplied, name='job_applied'),
    path('delete/jobApplied/', views.deletejobApplied, name='jobApplied'),
    path('get_data/JobApplied/', views.getJobAppliedData, name='workshopApplied'),

    # web url starts
    path('web_index/', views.webIndex, name='web_index'),
    path('web_job/', views.webJob, name='job'),
    path('web_campus/', views.webCampus, name='campus'),
    path('web_company/', views.webCompany, name='company'),
    path('web_placement/', views.webPlacement, name='placement'),
    path('web_study/', views.webStudy, name='study'),
    path('web_workshop/', views.webWorkshop, name='workshop'),
    path('web_about/', views.webAbout, name='about'),
    path('web_news/', views.webNews, name='news'),
    path('web_contact/', views.webContact, name='contact'),
    path('web_register/', views.webRegister, name='register'),

    path('web_applyjob/', views.webApplyJob, name='web_applyjob'),
    path('apply_job/', views.applyJob, name='apply_job'),
    path('apply_workshop/', views.applyWorkshop, name='apply_workshop'),


    path('get_job_details/', views.getJobDetails, name='job'),
    path('get_single_job_details/', views.getSingleJobDetails, name='job'),
    path('get_news_details/', views.getNewsDetails, name='news'),
    path('get_campus_details/', views.getCampusDetails, name='campus'),
    path('get_company_details/', views.getCompanyDetails, name='company'),
    path('get_placement_details/', views.getPlacementDetails, name='placement'),
    path('get_annual_placement_details/', views.getAnnualPlacementDetails, name='placement'),
    path('get_study_details/', views.getStudyDetails, name='study'),
    path('get_workshop_details/', views.getWorkshopDetails, name='workshop'),
    path('add/contact/', views.addContact, name='contact'),
    path('add/student/', views.addStudent, name='student'),
    path('student/', views.student, name='student'),
    path('get_student_data/', views.getStudentData, name='student'),

    path('web_login/', views.webLogin, name='web_login'),
    path('check_web_login/', views.checkWebLogin, name='web_login'),

    path('web_news_details/', views.webNewsDetails, name='newsDetails'),

    path('get_single_news_details/', views.getSingleNewsDetails, name='singleNewsDetails'),

    path('question_master/', views.question_master, name='question_master'),
    path('add/question_master/', views.addQuestionMaster, name='question_master'),
    path('update/question_master/', views.updateQuestionMaster, name='question_master'),
    path('delete/question_master/', views.deleteQuestionMaster, name='question_master'),
    path('get_data/question_master/', views.getQuestionMaster, name='question_master'),

    path('configure_test/', views.configure_test, name='admin_master'),

    path('test/', views.test, name='test'),
    path('get_test/', views.getTest, name='test'),
    path('result/', views.result, name='test'),
    path('add/result/', views.addResult, name='test'),
    path('get_result/', views.getResult, name='result'),
    path('attend_test/', views.attend_test, name='result'),

    path('admin_test/', views.admin_test, name='result'),
    path('get_admin_test_result_data/', views.getAdminTestResult, name='getAdminTestResult'),

    path('get_latest_test/', views.getLatestTest, name='result'),
    path('configure_test_details/', views.configureTest),

    path('web_forgot_password/', views.webForgotPassword, name='web_forgot_password'),
    path('web_update_password/', views.webUpdatePassword, name='web_forgot_password'),
    path('user_check_email/', views.checkEmail, name='user_check_email'),
    path('update_password/', views.updatePassword, name='update_password'),
    
]