from django.db import models

# Create your models here.

# admin

class AdminMaster(models.Model):
	ad_id = models.AutoField(primary_key=True, unique = True)
	ad_name = models.CharField(max_length=100)
	ad_mobile = models.CharField(max_length=100)
	ad_email = models.CharField(max_length=100)
	ad_password = models.CharField(max_length=100)
	ad_role = models.CharField(max_length=100)
	ad_status = models.CharField(max_length=100)
	ad_created_by = models.CharField(max_length=100)

# Approved Paper details
class Approved(models.Model):
	ap_id = models.AutoField(primary_key=True, unique = True)
	ap_name = models.CharField(max_length=100)
	ap_file = models.FileField(upload_to="training_placement/static/media/approved")
	ap_description = models.CharField(max_length=100)	
	ap_company = models.CharField(max_length=100)
	ap_status = models.CharField(max_length=100)
	ap_created_by = models.CharField(max_length=100)

# Company Details
class Company(models.Model):
	cm_id = models.AutoField(primary_key=True, unique = True)
	cm_name = models.CharField(max_length=100)
	cm_mobile = models.CharField(max_length=100)
	cm_email = models.CharField(max_length=100)
	cm_address = models.CharField(max_length=100)
	cm_head_office = models.CharField(max_length=100)
	cm_branches = models.CharField(max_length=100)
	cm_working_field = models.CharField(max_length=100)
	cm_employees = models.CharField(max_length=100)
	cm_achievements = models.CharField(max_length=100)
	cm_status = models.CharField(max_length=100)
	cm_created_by = models.CharField(max_length=100)

# Student Placed Details
class Placement(models.Model):
	pl_id = models.AutoField(primary_key=True, unique = True)
	pl_name = models.CharField(max_length=100)
	pl_gender = models.CharField(max_length=100)
	pl_branch = models.CharField(max_length=100)
	pl_usn = models.CharField(max_length=100)
	pl_company = models.CharField(max_length=100)
	pl_year = models.CharField(max_length=100)
	pl_package = models.CharField(max_length=100)
	pl_status = models.CharField(max_length=100)
	pl_created_by = models.CharField(max_length=100)


# Study material Details
class Study(models.Model):
	sm_id = models.AutoField(primary_key=True, unique = True)
	sm_name = models.CharField(max_length=100)
	sm_date = models.CharField(max_length=100)
	sm_file = models.FileField(upload_to="training_placement/static/media/study")
	sm_status = models.CharField(max_length=100)
	sm_created_by = models.CharField(max_length=100)

# workshop Details
class Workshop(models.Model):
	wr_id = models.AutoField(primary_key=True, unique = True)
	wr_topic = models.CharField(max_length=100)
	wr_date = models.CharField(max_length=100)
	wr_hosted_by =models.CharField(max_length=100)
	wr_status = models.CharField(max_length=100)
	wr_created_by = models.CharField(max_length=100)


# Campus Details
class Campus(models.Model):
	ca_id = models.AutoField(primary_key=True, unique = True)
	ca_clg_name = models.CharField(max_length=100)
	ca_cmp_name = models.CharField(max_length=100)
	ca_date =models.CharField(max_length=100)
	ca_duration =models.CharField(max_length=100)
	ca_status = models.CharField(max_length=100)
	ca_created_by = models.CharField(max_length=100)


# News Details
class News(models.Model):
	na_id = models.AutoField(primary_key=True, unique = True)
	na_image = models.ImageField(upload_to="training_placement/static/media/news")
	na_title= models.CharField(max_length=100)
	na_content =models.CharField(max_length=100)
	na_date =models.CharField(max_length=100)
	na_status = models.CharField(max_length=100)
	na_created_by = models.CharField(max_length=100)


# Job Details
class Job(models.Model):
	jb_id = models.AutoField(primary_key=True, unique = True)
	jb_title= models.CharField(max_length=100)
	jb_skills =models.CharField(max_length=100)
	jb_des =models.CharField(max_length=1000)
	jb_loc =models.CharField(max_length=100)
	jb_per =models.CharField(max_length=100)
	jb_package =models.CharField(max_length=100)
	jb_vac =models.CharField(max_length=100)
	jb_company = models.CharField(max_length=100)	
	jb_status = models.CharField(max_length=100)
	jb_created_by = models.CharField(max_length=100)

class Contact(models.Model):
	cn_id = models.AutoField(primary_key=True, unique = True)
	cn_name= models.CharField(max_length=100)
	cn_email =models.CharField(max_length=100)
	cn_subject =models.CharField(max_length=100)
	cn_message =models.CharField(max_length=100)	
	cn_status = models.CharField(max_length=100)
	cn_created_by = models.CharField(max_length=100)


class Register(models.Model):
	st_id = models.AutoField(primary_key=True, unique = True)
	st_name= models.CharField(max_length=100)
	st_usn =models.CharField(max_length=100)
	st_email =models.CharField(max_length=100)
	st_mobile =models.CharField(max_length=100)
	st_avg =models.CharField(max_length=100)	
	st_branch =models.CharField(max_length=100)	
	st_sem =models.CharField(max_length=100)
	st_resume =models.FileField(upload_to="training_placement/static/media/resume")
	st_pass =models.CharField(max_length=100)	
	st_status = models.CharField(max_length=100)
	st_created_by = models.CharField(max_length=100)

class JobApplied(models.Model):
	ja_id = models.AutoField(primary_key=True, unique = True)
	ja_jb_id = models.CharField(max_length=100)
	ja_title = models.CharField(max_length=100)
	ja_skills = models.CharField(max_length=100)
	ja_company_name = models.CharField(max_length=100)
	ja_company_email = models.CharField(max_length=100)
	ja_name = models.CharField(max_length=1000)
	ja_mobile = models.CharField(max_length=100)
	ja_email = models.CharField(max_length=100)
	ja_usn = models.CharField(max_length=100)
	ja_branch = models.CharField(max_length=100)
	ja_resume = models.CharField(max_length=100)
	ja_status = models.CharField(max_length=100)
	ja_created_by = models.CharField(max_length=100)


class WorkshopApplied(models.Model):
	wa_id = models.AutoField(primary_key=True, unique = True)
	wa_wr_id = models.CharField(max_length=100)
	wa_topic = models.CharField(max_length=100)
	wa_company_name = models.CharField(max_length=100)
	wa_company_email = models.CharField(max_length=100)
	wa_name = models.CharField(max_length=1000)
	wa_mobile = models.CharField(max_length=100)
	wa_email = models.CharField(max_length=100)
	wa_usn = models.CharField(max_length=100)
	wa_status = models.CharField(max_length=100)
	wa_created_by = models.CharField(max_length=100)

class QuestionMaster(models.Model):
	qm_id = models.AutoField(primary_key=True, unique = True)
	qm_name = models.CharField(max_length=100)
	qm_option1 = models.CharField(max_length=100)
	qm_option2 = models.CharField(max_length=100)
	qm_option3 = models.CharField(max_length=100)
	qm_option4 = models.CharField(max_length=100)
	qm_answer = models.CharField(max_length=100)
	qm_status = models.CharField(max_length=100)
	qm_created_by = models.CharField(max_length=100)

class Result(models.Model):
	re_id = models.AutoField(primary_key=True, unique = True)
	re_total_marks = models.CharField(max_length=100)
	re_obtained_marks = models.CharField(max_length=100)
	re_test_id = models.CharField(max_length=100)
	re_status = models.CharField(max_length=100)
	re_created_by = models.CharField(max_length=100)


class ConfigureTest(models.Model):
	ct_id = models.AutoField(primary_key=True, unique = True)
	# ct_subject = models.CharField(max_length=100)
	ct_date = models.CharField(max_length=100)
	ct_start_time = models.CharField(max_length=100)
	ct_end_time = models.CharField(max_length=100)
	ct_test_name = models.CharField(max_length=100)
	ct_status = models.CharField(max_length=100)
	ct_created_by = models.CharField(max_length=100)

class TestQuestions(models.Model):
	qm_id = models.AutoField(primary_key=True, unique = True)
	qm_test_id = models.CharField(max_length=100)
	qm_name = models.CharField(max_length=100)
	qm_option1 = models.CharField(max_length=100)
	qm_option2 = models.CharField(max_length=100)
	qm_option3 = models.CharField(max_length=100)
	qm_option4 = models.CharField(max_length=100)
	qm_answer = models.CharField(max_length=100)
	qm_status = models.CharField(max_length=100)
	qm_created_by = models.CharField(max_length=100)