from django.shortcuts import render
from training_placement.models import AdminMaster
from training_placement.models import Approved
from training_placement.models import Company
from training_placement.models import Placement
from training_placement.models import Study
from training_placement.models import Workshop
from training_placement.models import Campus
from training_placement.models import News
from training_placement.models import Job
from training_placement.models import Contact
from training_placement.models import Register
from training_placement.models import JobApplied
from training_placement.models import WorkshopApplied
from training_placement.models import QuestionMaster
from training_placement.models import Result
from training_placement.models import ConfigureTest
from training_placement.models import TestQuestions

from django.http import HttpResponse
from django.contrib.auth.models import Permission
from django.http import  JsonResponse
import pymongo
from rest_framework import serializers
import json
# from pymongo import MongoClient

# login

def openLogin(request):
	return render(request, 'index.html', {})

def login(request):
	if AdminMaster.objects.filter(ad_email=request.POST['txtEmail'], ad_password=request.POST['txtPassword'], ad_status='0').count():
		products_json = AdminMaster.objects.filter(ad_email=request.POST['txtEmail']).values()
		data = list(products_json)
		dictValue = data[0]
		request.session['email'] = dictValue['ad_email']
		request.session['role'] = dictValue['ad_role']
		request.session['name'] = dictValue['ad_name']

		return HttpResponse(dictValue['ad_role'])
	else:
		return HttpResponse("0")

def logout(request):
	request.session.delete()
	return render(request, 'index.html', {})

def webLogout(request):
	request.session.delete()
	return render(request, 'web/web_index.html', {})


# admin details
def adminMaster(request):
	return render(request, 'admin/admin_master.html', {})

def getData(request):

	products_json = AdminMaster.objects.filter(ad_status='0').values()
	data = list(products_json)
	value = JsonResponse(data, safe=False)
	return value

def add(request):
	lclID = AdminMaster.objects.count()
	status = "0"
	request.session['username'] = request.POST['txtEmail']

	lclNewID = lclID + 1

	AdminMaster.objects.create (
		ad_id = lclNewID,
		ad_name = request.POST['txtName'],
		ad_mobile = request.POST['txtMobileNo'],
		ad_email = request.POST['txtEmail'],
		ad_password = request.POST['txtPassword'],
		ad_role = request.POST['selRole'],
		ad_status = status,
		# ad_created_by = request.session['email']

	)

	return HttpResponse()
	# post.save()
	# pass

def update(request):
	AdminMaster.objects.filter(ad_id = request.POST['id']).update(ad_name = request.POST['txtName1'], ad_mobile = request.POST['txtMobileNo1'], ad_email = request.POST['txtEmail1'], ad_role = request.POST['selRole1'])
	return HttpResponse()
	# pass

def delete(request):

	AdminMaster.objects.filter(ad_id = request.POST['id']).update(ad_status = "1")
	return HttpResponse()

# approved papers details
def approved(request):

	if request.session['email']:
		if request.session['role'] == "Admin":
			return render(request, 'admin/approved.html', {})
		else:
			return render(request, 'company/approved.html', {})

	else:
		return render(request, 'index.html', {})

def getApprovedData(request):
	if request.session['role'] == "Admin":
		approved_json = Approved.objects.filter(ap_status='0').values()
		data = list(approved_json)
		value = JsonResponse(data, safe=False)
		return value
	else:
		# print(request.session['email'])
		approved_json = Approved.objects.filter(ap_status='0', ap_created_by=request.session['email']).values()
		data = list(approved_json)
		value = JsonResponse(data, safe=False)
		return value


def addApproved(request):
	# post = AdminMaster(first_name=request.POST.get("Karthik"), last_name=request.POST.get("Hanasi"))
	# count collection
	lclID = Approved.objects.count()
	status = "0"
	lclNewID = lclID + 1

	Approved.objects.create (
		ap_id = lclNewID,
		ap_name = request.POST["txtName"],
		ap_file = request.FILES["txtFile"],
		ap_description = request.POST["txtDescription"],
		ap_company = request.POST['txtCompany'],
		ap_status = status,
		ap_created_by = request.session['email']

	)

	return HttpResponse()

def updateApproved(request):

	Approved.objects.filter(ap_id = request.POST['id']).update(ap_name = request.POST['txtName1'], ap_description = request.POST['txtDescription1'], ap_company = request.POST['txtCompany1'])
	return HttpResponse()
	# pass

def deleteApproved(request):

	Approved.objects.filter(ap_id = request.POST['id']).update(ap_status = "1")
	return HttpResponse()


# company details

def company(request):
	if request.session['email']:
		if request.session['role'] == "Admin":
			return render(request, 'admin/company.html', {})
		else:
			return render(request, 'company/company.html', {})
	else:
		return render(request, 'index.html', {})


def getCompanyData(request):

	if request.session['role'] == "Admin":
		company_json = Company.objects.filter(cm_status='0').values()
		data = list(company_json)
		value = JsonResponse(data, safe=False)
		return value
	else:
		# print(request.session['email'])
		company_json = Company.objects.filter(cm_status='0', cm_name=request.session['name']).values()
		data = list(company_json)
		value = JsonResponse(data, safe=False)
		return value

def addCompany(request):
	# count collection
	lclID = Company.objects.count()
	status = "0"
	lclNewID = lclID + 1

	Company.objects.create(
		cm_id = lclNewID,
		cm_name = request.POST['txtName'],
		cm_mobile = request.POST['txtMobileNo'],
		cm_email = request.POST['txtEmail'],
		cm_address = request.POST['txtAddress'],
		cm_head_office = request.POST['txtHeadOffice'],
		cm_branches = request.POST['txtBranches'],
		cm_working_field = request.POST['txtWorkingField'],
		cm_employees = request.POST['txtEmployees'],
		cm_achievements = request.POST['txtAchievement'],
		cm_status = status,
		cm_created_by = request.session['email']

	)

	return HttpResponse()
	# post.save()
	# pass

def updateCompany(request):
	Company.objects.filter(cm_id = request.POST['id']).update(cm_name = request.POST['txtName1'], cm_mobile = request.POST['txtMobileNo1'], cm_email = request.POST['txtEmail1'], cm_address = request.POST['txtAddress1'], cm_head_office = request.POST['txtHeadOffice1'], cm_branches = request.POST['txtBranches1'], cm_working_field = request.POST['txtWorkingField1'], cm_employees = request.POST['txtEmployees1'], cm_achievements = request.POST['txtAchievement1'])
	return HttpResponse()
	# pass

def deleteCompany(request):

	Company.objects.filter(cm_id = request.POST['id']).update(cm_status = "1")
	return HttpResponse()


# Student Placed  details

def placement(request):
	if request.session['email']:
		if request.session['role'] == "Admin":
			return render(request, 'admin/placement.html', {})
		else:
			return render(request, 'company/placement.html', {})
	return render(request, 'index.html', {})

def getPlacementData(request):

	if request.session['role'] == "Admin":
		placement_json =Placement.objects.filter(pl_status='0').values()
		data = list(placement_json)
		value = JsonResponse(data, safe=False)
		return value
	else:
		# print(request.session['name'])
		placement_json = Placement.objects.filter(pl_status='0', pl_created_by=request.session['email']).values()
		data = list(placement_json)
		value = JsonResponse(data, safe=False)
		return value


def addPlacement(request):
	# count collection
	lclID = Placement.objects.count()
	status = "0"
	lclNewID = lclID + 1

	Placement.objects.create(
		pl_id = lclNewID,
		pl_name = request.POST['txtName'],
		pl_gender = request.POST['txtGender'],
		pl_branch = request.POST['txtBranch'],
		pl_usn = request.POST['txtUsn'],
		pl_company = request.POST['txtPlacedCompany'],
		pl_year =request.POST['txtPlacedYear'],
		pl_package = request.POST['txtPackage'],
		pl_status = status,
		pl_created_by = request.session['email']

	)
	return HttpResponse()

def updatePlacement(request):
	Placement.objects.filter(pl_id = request.POST['id']).update(pl_name = request.POST['txtName1'], pl_gender = request.POST['txtGender1'], pl_branch = request.POST['txtBranch1'], pl_usn = request.POST['txtUsn1'], pl_company = request.POST['txtPlacedCompany1'], pl_year = request.POST['txtPlacedYear1'], pl_package = request.POST['txtPackage1'])
	return HttpResponse()
	# pass

def deletePlacement(request):

	Placement.objects.filter(pl_id = request.POST['id']).update(pl_status = "1")
	return HttpResponse()

# annual_placement

def annual_placement(request):
	if request.session['email']:
		if request.session['role'] == "Admin":
			return render(request, 'admin/annual_placement.html', {})
		else:
			return render(request, 'company/annual_placement.html', {})
	return render(request, 'index.html', {})


def getAnnual_placementData(request):

	placement_json =Placement.objects.filter(pl_status='0').values()
	data = list(placement_json)
	value = JsonResponse(data, safe=False)
	return value

# study Materials

def study(request):
	if request.session['email']:
		if request.session['role'] == "Admin":
			return render(request, 'admin/study_material.html', {})
		else:
			return render(request, 'company/study_material.html', {})
	return render(request, 'index.html', {})


def addStudy(request):
	# count collection
	lclID = Study.objects.count()
	status = "0"
	lclNewID = lclID + 1

	Study.objects.create(
		sm_id = lclNewID,
		sm_name = request.POST['txtName'],
		sm_date = request.POST['txtAttachDate'],
		sm_file = request.FILES['txtFile'],
		sm_status = status,
		sm_created_by = request.session['email']

	)
	return HttpResponse()

def getStudyData(request):

	study_json =Study.objects.filter(sm_status='0').values()
	data = list(study_json)
	value = JsonResponse(data, safe=False)
	return value

def updateStudy(request):
	Study.objects.filter(sm_id = request.POST['id']).update(sm_name = request.POST['txtName1'], sm_date = request.POST['txtAttachDate1'])
	return HttpResponse()
	# pass

def deleteStudy(request):

	Study.objects.filter(sm_id = request.POST['id']).update(sm_status = "1")
	return HttpResponse()


# workshop details

def workshop(request):
	if request.session['email']:
		if request.session['role'] == "Admin":
			return render(request, 'admin/workshop.html', {})
		else:
			return render(request, 'company/workshop.html', {})
	return render(request, 'index.html', {})


def addWorkshop(request):
	# count collection
	lclID = Workshop.objects.count()
	status = "0"
	lclNewID = lclID + 1

	Workshop.objects.create(
		wr_id = lclNewID,
		wr_topic = request.POST['txtName'],
		wr_date = request.POST['txtWorkshopDate'],
		wr_hosted_by = request.POST['txtWorkshopHosted'],
		wr_status = status,
		wr_created_by = request.session['email']

	)
	return HttpResponse()

def getWorkshopData(request):

	workshop_json =Workshop.objects.filter(wr_status='0').values()
	data = list(workshop_json)
	value = JsonResponse(data, safe=False)
	return value

def updateWorkshop(request):
	Workshop.objects.filter(wr_id = request.POST['id']).update(wr_topic = request.POST['txtName1'], wr_date = request.POST['txtWorkshopDate1'], wr_hosted_by = request.POST['txtWorkshopHosted1'])
	return HttpResponse()
	# pass

def deleteWorkshop(request):

	Workshop.objects.filter(wr_id = request.POST['id']).update(wr_status = "1")
	return HttpResponse()

# Workshop applied details
def workshopApplied(request):
	if request.session['email']:
		if request.session['role'] == "Admin":
			return render(request, 'admin/workshop_applied.html', {})
		else:
			return render(request, 'company/workshop_applied.html', {})
	return render(request, 'index.html', {})

def getworkshopAppliedData(request):

	if request.session['role'] == "Admin":
		workshop_json =WorkshopApplied.objects.filter(wa_status='0').values()
		data = list(workshop_json)
		value = JsonResponse(data, safe=False)
		return value
	else:
		# print(request.session['email'])
		workshop_json = WorkshopApplied.objects.filter(wa_status='0', wa_company_email=request.session['email']).values()
		data = list(workshop_json)
		value = JsonResponse(data, safe=False)
		return value

def deleteWorkshopApplied(request):

	WorkshopApplied.objects.filter(wa_id = request.POST['id']).update(wa_status = "1")
	return HttpResponse()

# campus details

def campus(request):
	if request.session['email']:
		if request.session['role'] == "Admin":
			return render(request, 'admin/campus.html', {})
		else:
			return render(request, 'company/campus.html', {})
	return render(request, 'index.html', {})


def addCampus(request):
	# count collection
	lclID = Campus.objects.count()
	status = "0"
	lclNewID = lclID + 1

	Campus.objects.create(
		ca_id = lclNewID,
		ca_clg_name = request.POST['txtName'],
		ca_cmp_name = request.POST['txtCompanyName'],
		ca_date = request.POST['txtCampusDate'],
		ca_duration = request.POST['txtCampusDuration'],
		ca_status = status,
		ca_created_by = request.session['email']

	)
	return HttpResponse()	


def getCampusData(request):

	campus_json =Campus.objects.filter(ca_status='0').values()
	data = list(campus_json)
	value = JsonResponse(data, safe=False)
	return value

def updateCampus(request):
	Campus.objects.filter(ca_id = request.POST['id']).update(ca_clg_name = request.POST['txtName1'], ca_cmp_name = request.POST['txtCompanyName1'], ca_date = request.POST['txtCampusDate1'], ca_duration = request.POST['txtCampusDuration1'])
	return HttpResponse()


def deleteCampus(request):

	Campus.objects.filter(ca_id = request.POST['id']).update(ca_status = "1")
	return HttpResponse()


#  news details

def news(request):
	if request.session['email']:
		if request.session['role'] == "Admin":
			return render(request, 'admin/news.html', {})
		else:
			return render(request, 'company/news.html', {})
	return render(request, 'index.html', {})


def addNews(request):
	# count collection
	lclID = News.objects.count()
	status = "0"
	lclNewID = lclID + 1

	News.objects.create(
		na_id = lclNewID,
		na_image = request.FILES['phPhoto'],
		na_title = request.POST['txtTitle'],
		na_content = request.POST['txtContent'],
		na_date = request.POST['txtDate'],
		na_status = status,
		na_created_by = request.session['email']

	)
	return HttpResponse()	


def getNewsData(request):

	news_json =News.objects.filter(na_status='0').values()
	data = list(news_json)
	value = JsonResponse(data, safe=False)
	return value

def updateNews(request):
	News.objects.filter(na_id = request.POST['id']).update(na_title = request.POST['txtTitle1'], na_content = request.POST['txtContent1'], na_date = request.POST['txtDate1'])
	return HttpResponse()

def deleteNews(request):

	News.objects.filter(na_id = request.POST['id']).update(na_status = "1")
	return HttpResponse()


def job(request):
	return render(request, 'company/job.html', {})


def addJob(request):
	# count collection
	lclID = Job.objects.count()
	status = "0"
	lclNewID = lclID + 1

	Job.objects.create(
		jb_id = lclNewID,
		jb_title = request.POST['txtJobTitle'],
		jb_skills = request.POST['txtSkills'],
		jb_des = request.POST['txtDescription'],
		jb_loc = request.POST['txtLocation'],
		jb_per = request.POST['txtPercentage'],
		jb_package = request.POST['txtPackage'],
		jb_vac = request.POST['txtVacancies'],
		jb_company = request.session['name'],
		jb_status = status,
		jb_created_by = request.session['email']

	)
	return HttpResponse()	


def getJobData(request):

	if request.session['role'] == "Admin":
		job_json =Job.objects.filter(jb_status='0').values()
		data = list(job_json)
		value = JsonResponse(data, safe=False)
		return value
	else:
		# print(request.session['email'])
		job_json = Job.objects.filter(jb_status='0', jb_company=request.session['name']).values()
		data = list(job_json)
		value = JsonResponse(data, safe=False)
		return value


def updateJob(request):
	Job.objects.filter(jb_id = request.POST['id']).update(jb_title = request.POST['txtJobTitle1'], jb_skills = request.POST['txtSkills1'], jb_des = request.POST['txtDescription1'], jb_loc = request.POST['txtLocation1'], jb_per = request.POST['txtPercentage1'], jb_package = request.POST['txtPackage1'], jb_vac = request.POST['txtVacancies1'])
	return HttpResponse()

def deleteJob(request):

	Job.objects.filter(jb_id = request.POST['id']).update(jb_status = "1")
	return HttpResponse()


# Job applied details
def jobApplied(request):
	if request.session['email']:
		if request.session['role'] == "Admin":
			return render(request, 'admin/job_applied.html', {})
		else:
			return render(request, 'company/job_applied.html', {})
	return render(request, 'index.html', {})

def getJobAppliedData(request):

	if request.session['role'] == "Admin":
		job_json =JobApplied.objects.filter(ja_status='0').values()
		data = list(job_json)
		value = JsonResponse(data, safe=False)
		return value
	else:
		# print(request.session['email'])
		job_json = JobApplied.objects.filter(ja_status='0', ja_company_email=request.session['email']).values()
		data = list(job_json)
		value = JsonResponse(data, safe=False)
		return value

def deletejobApplied(request):

	JobApplied.objects.filter(ja_id = request.POST['id']).update(ja_status = "1")
	return HttpResponse()

# web url 
def webIndex(request):
	return render(request, 'web/web_index.html', {})

def webJob(request):
	return render(request, 'web/web_job.html', {})

def webCampus(request):
	return render(request, 'web/web_campus.html', {})

def webCompany(request):
	return render(request, 'web/web_company.html', {})

def webPlacement(request):
	return render(request, 'web/web_placement.html', {})

def webStudy(request):
	return render(request, 'web/web_study.html', {})

def webWorkshop(request):
	return render(request, 'web/web_workshop.html', {})

def webAbout(request):
	return render(request, 'web/web_about.html', {})

def webNews(request):
	return render(request, 'web/web_news.html', {})

def webContact(request):
	return render(request, 'web/web_contact.html', {})

def webRegister(request):
	return render(request, 'web/web_register.html', {})

def webApplyJob(request):
	return render(request, 'web/web_applyjob.html', {})

def webLogin(request):
	return render(request, 'web/web_login.html', {})

def webNewsDetails(request):
	return render(request, 'web/web_news_details.html', {});

def student(request):
	return render(request, 'admin/student.html', {});

def getStudentData(request):
	getData = Register.objects.filter().values();
	data = list(getData)
	value = JsonResponse(data, safe=False)
	return value

def  getJobDetails(request):
	job_json = Job.objects.filter(jb_status='0').values()
	data = list(job_json)
	value = JsonResponse(data, safe=False)
	return value

def  getSingleJobDetails(request):
	job_json = Job.objects.filter(jb_status='0', jb_id = request.POST['txtJobID'],).values()
	data = list(job_json)
	value = JsonResponse(data, safe=False)
	return value

def  getNewsDetails(request):
	news_json =News.objects.filter(na_status='0').values()
	data = list(news_json)
	value = JsonResponse(data, safe=False)
	return value

def  getCampusDetails(request):
	campus_json =Campus.objects.filter(ca_status='0').values()
	data = list(campus_json)
	value = JsonResponse(data, safe=False)
	return value

def  getCompanyDetails(request):
	company_json = Company.objects.filter(cm_status='0').values()
	data = list(company_json)
	value = JsonResponse(data, safe=False)
	return value

def  getPlacementDetails(request):
	placement_json = Placement.objects.filter(pl_status='0').values()
	data = list(placement_json)
	value = JsonResponse(data, safe=False)
	return value

def  getAnnualPlacementDetails(request):
	placement_json = Placement.objects.filter(pl_status='0').values()
	data = list(placement_json)
	value = JsonResponse(data, safe=False)
	return value

def  getStudyDetails(request):
	study_json =Study.objects.filter(sm_status='0').values()
	data = list(study_json)
	value = JsonResponse(data, safe=False)
	return value

def  getWorkshopDetails(request):
	workshop_json =Workshop.objects.filter(wr_status='0').values()
	data = list(workshop_json)
	value = JsonResponse(data, safe=False)
	return value

def addContact(request):
	# count collection
	lclID = Contact.objects.count()
	status = "0"
	lclNewID = lclID + 1

	Contact.objects.create(
		cn_id = lclNewID,
		cn_name = request.POST['txtName'],
		cn_email = request.POST['txtEmail'],
		cn_subject = request.POST['txtSubject'],
		cn_message = request.POST['txtMessage'],
		cn_status = status,
		cn_created_by = request.session['email']

	)
	return HttpResponse()


def addStudent(request):
	# count collection
	lclID = Register.objects.count()
	status = "0"
	lclNewID = lclID + 1

	request.session['web_email'] = request.POST['txtEmail']
	request.session['web_name'] = request.POST['txtName']
	Register.objects.create(
		st_id = lclNewID,
		st_name = request.POST['txtName'],
		st_usn = request.POST['txtUSN'],
		st_email = request.POST['txtEmail'],
		st_mobile = request.POST['txtMobile'],
		st_avg = request.POST['txtTotalAvg'],
		st_branch = request.POST['txtBranch'],
		st_sem = request.POST['txtSemester'],
		st_resume = request.FILES['txtFile'],
		st_pass = request.POST['txtPassword'],
		st_status = status,
		st_created_by = request.POST['txtEmail']

	)
	return HttpResponse()

def applyJob(request):
	# count collection

	if 'web_email' in request.session:

		if JobApplied.objects.filter(ja_email=request.session['web_email'], ja_jb_id=request.POST['txtJobID'], ja_status='0').count(): 
			return HttpResponse(100)
		else:
			
			lclID = JobApplied.objects.count()
			status = "0"
			lclNewID = lclID + 1

			# get student details by web_email session
			products_json1 = Register.objects.filter(st_email=request.session['web_email']).values()
			data1 = list(products_json1)
			dictValue1 = data1[0]
			# dictValue1['st_email']

			# get job details by jobID
			products_json2 = Job.objects.filter(jb_id=request.POST['txtJobID']).values()
			data2 = list(products_json2)
			dictValue2 = data2[0]
			# dictValue2['st_email']

			JobApplied.objects.create(
				ja_id = lclNewID,
				ja_jb_id = request.POST['txtJobID'],
				ja_title = dictValue2['jb_title'],
				ja_skills = dictValue2['jb_skills'],
				ja_company_name = dictValue2['jb_company'],
				ja_company_email = dictValue2['jb_created_by'],
				ja_name = dictValue1['st_name'],
				ja_mobile = dictValue1['st_mobile'],
				ja_email = dictValue1['st_email'],
				ja_usn = dictValue1['st_usn'],
				ja_branch = dictValue1['st_branch'],
				ja_resume = dictValue1['st_resume'],
				ja_status = status,
				ja_created_by = request.session['web_email']

			)
			return HttpResponse(0)
			
	else:
		return HttpResponse(10)

def applyWorkshop(request):
	# count collection

	if 'web_email' in request.session:

		if WorkshopApplied.objects.filter(wa_email=request.session['web_email'], wa_wr_id=request.POST['txtWorkshopID'], wa_status='0').count(): 
			return HttpResponse(100)
		else:
			
			lclID = WorkshopApplied.objects.count()
			status = "0"
			lclNewID = lclID + 1

			# get student details by web_email session
			products_json1 = Register.objects.filter(st_email=request.session['web_email']).values()
			data1 = list(products_json1)
			dictValue1 = data1[0]
			# dictValue1['st_email']

			# get Workshop details by jobID
			products_json2 = Workshop.objects.filter(wr_id=request.POST['txtWorkshopID']).values()
			data2 = list(products_json2)
			dictValue2 = data2[0]
			# dictValue2['st_email']

			WorkshopApplied.objects.create(
				wa_id = lclNewID,
				wa_wr_id = request.POST['txtWorkshopID'],
				wa_topic = dictValue2['wr_topic'],
				wa_company_name = dictValue2['wr_hosted_by'],
				wa_company_email = dictValue2['wr_created_by'],
				wa_name = dictValue1['st_name'],
				wa_mobile = dictValue1['st_mobile'],
				wa_email = dictValue1['st_email'],
				wa_usn = dictValue1['st_usn'],
				wa_status = status,
				wa_created_by = request.session['web_email']

			)
			return HttpResponse(0)
			
	else:
		return HttpResponse(10)

def checkWebLogin(request):
	if Register.objects.filter(st_email=request.POST['txtEmail'], st_pass=request.POST['txtPassword'], st_status='0').exists():
		products_json = Register.objects.filter(st_email=request.POST['txtEmail']).values()
		data = list(products_json)
		dictValue = data[0]
		request.session['web_email'] = dictValue['st_email']
		request.session['web_name'] = dictValue['st_name']

		return HttpResponse(0)
	else:
		return HttpResponse(10)

def  getSingleNewsDetails(request):
	news_json =News.objects.filter(na_status='0', na_id=request.POST['txtNewsID']).values()
	data = list(news_json)
	value = JsonResponse(data, safe=False)
	return value

# Question Master
def question_master(request):

	return render(request, 'admin/question_master.html', {})

def addQuestionMaster(request):
	# post = AdminMaster(first_name=request.POST.get("Karthik"), last_name=request.POST.get("Hanasi"))
	# count collection
	lclID = QuestionMaster.objects.count()
	status = "0"
	lclNewID = lclID + 1

	QuestionMaster.objects.create (
		qm_id = lclNewID,
		qm_name = request.POST['txtQuestion'],
		qm_option1 = request.POST['txtOption1'],
		qm_option2 = request.POST['txtOption2'],
		qm_option3 = request.POST['txtOption3'],
		qm_option4 = request.POST['txtOption4'],
		qm_answer = request.POST['txtAnswer'],
		qm_status = status,
		qm_created_by = request.session['email']	
	)

	return HttpResponse()


def getQuestionMaster(request):
	question_json = QuestionMaster.objects.filter(qm_status='0').values()
	data = list(question_json)
	value = JsonResponse(data, safe=False)
	return value


def updateQuestionMaster(request):
	QuestionMaster.objects.filter(qm_id = request.POST['id']).update(qm_name = request.POST['txtQuestion1'],qm_option1 = request.POST['txtOption11'],qm_option2 = request.POST['txtOption22'],qm_option3 = request.POST['txtOption33'],qm_option4 = request.POST['txtOption44'],qm_answer = request.POST['txtAnswer1'])
	return HttpResponse()


def deleteQuestionMaster(request):

	QuestionMaster.objects.filter(qm_id = request.POST['id']).update(qm_status = "1")
	return HttpResponse()

def attend_test(request):
	return render(request, 'web/attend_test.html', {})

def admin_test(request):
	return render(request, 'admin/admin_test.html', {})

def test(request):
	if 'web_email' in request.session:
		return render(request, 'web/test.html', {});
	else:
		return render(request, 'web/web_login.html', {});

def result(request):
	return render(request, 'web/result.html', {})

def addResult(request):
	# post = AdminMaster(first_name=request.POST.get("Karthik"), last_name=request.POST.get("Hanasi"))
	# count collection
	lclID = Result.objects.count()
	status = "0"
	lclNewID = lclID + 1

	Result.objects.create (
		re_id = lclNewID,
		re_total_marks = request.POST['txtTotalMarks'],
		re_obtained_marks = request.POST['txtObtainedMarks'],
		re_status = status,
		re_test_id = request.POST['txtID'],
		re_created_by = request.session['web_email']	
	)

	return HttpResponse()

def getTest(request):
	test_json = TestQuestions.objects.filter(qm_test_id=request.POST['txtID']).values()
	data = list(test_json)
	value = JsonResponse(data, safe=False)
	return value

def getResult(request):
	result_json = Result.objects.filter(re_status='0',re_created_by = request.session['web_email']).values()
	data = list(result_json)
	value = JsonResponse(data, safe=False)
	return value

def configure_test(request):
	return render(request, 'admin/configure_test.html', {})

def configureTest(request):
	if request.POST['action'] == "add":

		lclID = ConfigureTest.objects.count()
		status = "0"
		lclNewID = lclID + 1

		ConfigureTest.objects.create(
			ct_id = lclNewID,
            # ct_subject = request.POST['selSubject'],
            ct_date = request.POST['dateTestDate'],
            ct_start_time = request.POST['timeStartTime'],
            ct_end_time = request.POST['timeEndTime'],
            ct_test_name = request.POST['txtName'],
            ct_status = 0
        )


		txtQuestions = request.POST['txtQuestions1'].split("[]")
        # k = 0;
		for i in txtQuestions:

			lclID1 = TestQuestions.objects.count()
			status = "0"
			lclNewID1 = lclID1 + 1

			question_json = QuestionMaster.objects.filter(qm_id=i).values()
			data = list(question_json)
			value = data[0]
			# return value

			TestQuestions.objects.create (
	        	qm_id = lclNewID1,
	            qm_name = value['qm_name'],
	            qm_test_id = lclNewID,
				qm_option1 = value['qm_option1'],
				qm_option2 = value['qm_option2'],
				qm_option3 = value['qm_option3'],
				qm_option4 = value['qm_option4'],
				qm_answer = value['qm_answer'],
	        )

			# k += 1

	elif request.POST['action'] == "getData":
		data = ConfigureTest.objects.filter(ct_status='0').values()
		data = list(data)
		values = JsonResponse(data, safe=False)
		return values

	elif request.POST['action'] == "delete":
		data = ConfigureTest.objects.filter(ct_id=request.POST['id']).update(ct_status='1')

	return HttpResponse()

def getLatestTest(request):

	data = ConfigureTest.objects.filter(ct_status='0').values()
	data = list(data)[-1]
	dataVal = data
	dataRes = Result.objects.filter(re_created_by=request.session['web_email'], re_test_id=dataVal['ct_id']).count()
	if dataRes == 0:
		values = JsonResponse(data, safe=False)
		return values
	else:
		return HttpResponse("0")

def getAdminTestResult(req):
	result_json = Result.objects.filter(re_status='0').values()
	data = list(result_json)
	value = JsonResponse(data, safe=False)
	return value

def webForgotPassword(request):
    return render(request, 'web/web_forgot_password.html');

def webUpdatePassword(request):
    return render(request, 'web/web_update_password.html');

def checkEmail(request):
    if Register.objects.filter(st_email=request.POST['txtEmail'], st_status='0').count():
        request.session['forgot_email'] = request.POST['txtEmail'];
        return HttpResponse("1");
    else:
        return HttpResponse("10");

def updatePassword(request):
    Register.objects.filter(st_email=request.session['forgot_email']).update(
        st_pass = request.POST['txtPassword']
    );

    return HttpResponse("1");