Project Nmae: Job-posting-backend

This is NoSQL mongodb database used: mongoose typescript project.

Auth routes
user register: http://localhost:5000/api/v1/auth/register
emil verify: http://localhost:5000/api/v1/auth/verify-email
user login: http://localhost:5000/api/v1/auth/login
forget-password: http://localhost:5000/api/v1/auth/forgot-password
resend-otp: http://localhost:5000/api/v1/auth/resend-otp
reset-password: http://localhost:5000/api/v1/auth/reset-password
refacetoken   : http://localhost:5000/api/v1/auth/refresh-token
change-password   : http://localhost:5000/api/v1/auth/change-password



Admin routes,
create-job: http://localhost:5000/api/v1/job/create-job (POST)
update-job: http://localhost:5000/api/v1/job/update-job/67a5ce61df3360fd34a691a1 (PATCH)
delete-job: http://localhost:5000/api/v1/job/delete-job/67d8419db55dc3ae9222ed22 (DELETE)

how much user apply -job: http://localhost:5000/api/v1/job/apply/applied-user (GET)
Apply-usercount: http://localhost:5000/api/v1/job/application-user (GET)
RECENT-Apply-user: http://localhost:5000/api/v1/apply/recentapply (GET)
Total-application: http://localhost:5000/api/v1/apply/total-applicaiton(GET)
Total-job: http://localhost:5000/api/v1/job/total-job (GET)
Create-shortlist-user: http://localhost:5000/api/v1/apply/shorlist/67a1c80f89fd3cf65ce6786b (POST)
ALL-shortlist user: http://localhost:5000/api/v1/apply/shorlist (GET);
Total-shortlist-count: http://localhost:5000/api/v1/apply/totla-sh(GET)orlist
Reject-apply-user: http://localhost:5000/api/v1/apply/reject/67a1c9108dee5e047eb030f0(POST);
admin-one click all subscription email send mail: http://localhost:5000/api/v1/newsletter/send-newsletter-message (post)(paid-verson) 
{
    "subject":"TODAY latest-job",
    "content":"all news get anytime search -today job"
}

how much user apply job-notification: http://localhost:5000/api/v1/notifications/notifications (GET)

user-contact:http://localhost:5000/api/v1/contact/get-message (GET)

ADMIN-BLOG
CREATE-BLOG: http://localhost:5000/api/v1/blog/post-blog (POST) {FORM-DATA}
UPDATE-BLOG: http://localhost:5000/api/v1/blog/update-blog/67a6b8312ec6ba5e8825023c (PATCH)
DELETE-BLOG: http://localhost:5000/api/v1/blog/679dc553172039b3f84824b1
GET-published-blog: http://localhost:5000/api/v1/blog/published
GET-Draft-blog: http://localhost:5000/api/v1/log/draft (get)

faq
add-faq: http://localhost:5000/api/v1/faq/add(POST)
UPDATED: http://localhost:5000/api/v1/faq/faq/67a6fcdd91f33e2343018a16(PATCH)
DELETE: http://localhost:5000/api/v1/faq/faq/67a6fcdd91f33e2343018a16(DELETE)




User routes,
user-upload-his-profile-image: http://localhost:5000/api/v1/user/profile-image (POST)
user get-profie: http://localhost:5000/api/v1/user/profile
Get-all-jobs: http://localhost:5000/api/v1/job/all-jobs (GET)
single-job: http://localhost:5000/api/v1/job/single-job/679ca8d166262e6023b3401d
user-save-any job: http://localhost:5000/api/v1/job/save-job (POST) BODY: {"jobId":"679b0edb2ab71cfc8cfc6b65"}
Get- User-all-save-job: http://localhost:5000/api/v1/job/saved-jobs (GET)
REMOVE-JOB: http://localhost:5000/api/v1/job/remove-saved-job (delete)

user-apply-job:http://localhost:5000/api/v1/apply(POST) [fom data]
Get-applyed job: http://localhost:5000/api/v1/apply/my-apply(Get)

User-email-subscription-newletter:http://localhost:5000/api/v1/newsletter/ (POST) BODY:{"email":"genapax151@bankrau.com"}
get-faq: http://localhost:5000/api/v1/faq/faq (GET)
SINGLE-FAQ: /faq/faq/67a6fcdd91f33e2343018a16(GET)

GET-ALL-BLOG: http://localhost:5000/api/v1/blog
SINGLE-BLOG: http://localhost:5000/blog/67affb2b23b4d8b276e58ca7

