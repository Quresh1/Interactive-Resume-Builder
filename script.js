var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        this.educationList = [];
        this.skillsList = [];
        this.workExperienceList = [];
        this.initializeEventListeners();
    }
    ResumeBuilder.prototype.initializeEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d;
        (_a = document.getElementById('add-education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.addEducation(); });
        (_b = document.getElementById('add-skill')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.addSkill(); });
        (_c = document.getElementById('add-work')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.addWorkExperience(); });
        (_d = document.getElementById('download-resume')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return _this.downloadResume(); });
    };
    ResumeBuilder.prototype.addEducation = function () {
        var educationItem = {
            degree: '',
            school: '',
            year: ''
        };
        this.educationList.push(educationItem);
        this.renderEducation();
    };
    ResumeBuilder.prototype.addSkill = function () {
        this.skillsList.push('');
        this.renderSkills();
    };
    ResumeBuilder.prototype.addWorkExperience = function () {
        var workItem = {
            title: '',
            company: '',
            duration: '',
            description: ''
        };
        this.workExperienceList.push(workItem);
        this.renderWorkExperience();
    };
    ResumeBuilder.prototype.renderEducation = function () {
        var educationListElement = document.getElementById('education-list');
        if (educationListElement) {
            educationListElement.innerHTML = '';
            this.educationList.forEach(function (edu, index) {
                var eduElement = document.createElement('div');
                eduElement.innerHTML = "\n              <input type=\"text\" placeholder=\"Degree\" value=\"".concat(edu.degree, "\" onchange=\"resumeBuilder.updateEducation(").concat(index, ", 'degree', this.value)\">\n              <input type=\"text\" placeholder=\"School\" value=\"").concat(edu.school, "\" onchange=\"resumeBuilder.updateEducation(").concat(index, ", 'school', this.value)\">\n              <input type=\"text\" placeholder=\"Year\" value=\"").concat(edu.year, "\" onchange=\"resumeBuilder.updateEducation(").concat(index, ", 'year', this.value)\">\n              <button class=\"remove-btn\" onclick=\"resumeBuilder.removeEducation(").concat(index, ")\">Remove</button>\n          ");
                educationListElement.appendChild(eduElement);
            });
        }
    };
    ResumeBuilder.prototype.renderSkills = function () {
        var skillsListElement = document.getElementById('skills-list');
        if (skillsListElement) {
            skillsListElement.innerHTML = '';
            this.skillsList.forEach(function (skill, index) {
                var skillElement = document.createElement('div');
                skillElement.innerHTML = "\n              <input type=\"text\" placeholder=\"Skill\" value=\"".concat(skill, "\" onchange=\"resumeBuilder.updateSkill(").concat(index, ", this.value)\">\n              <button class=\"remove-btn\" onclick=\"resumeBuilder.removeSkill(").concat(index, ")\">Remove</button>\n          ");
                skillsListElement.appendChild(skillElement);
            });
        }
    };
    ResumeBuilder.prototype.renderWorkExperience = function () {
        var workListElement = document.getElementById('work-experience-list');
        if (workListElement) {
            workListElement.innerHTML = '';
            this.workExperienceList.forEach(function (work, index) {
                var workElement = document.createElement('div');
                workElement.innerHTML = "\n              <input type=\"text\" placeholder=\"Job Title\" value=\"".concat(work.title, "\" onchange=\"resumeBuilder.updateWorkExperience(").concat(index, ", 'title', this.value)\">\n              <input type=\"text\" placeholder=\"Company\" value=\"").concat(work.company, "\" onchange=\"resumeBuilder.updateWorkExperience(").concat(index, ", 'company', this.value)\">\n              <input type=\"text\" placeholder=\"Duration\" value=\"").concat(work.duration, "\" onchange=\"resumeBuilder.updateWorkExperience(").concat(index, ", 'duration', this.value)\">\n              <textarea placeholder=\"Job Description\" onchange=\"resumeBuilder.updateWorkExperience(").concat(index, ", 'description', this.value)\">").concat(work.description, "</textarea>\n              <button class=\"remove-btn\" onclick=\"resumeBuilder.removeWorkExperience(").concat(index, ")\">Remove</button>\n          ");
                workListElement.appendChild(workElement);
            });
        }
    };
    ResumeBuilder.prototype.updateEducation = function (index, field, value) {
        this.educationList[index][field] = value;
    };
    ResumeBuilder.prototype.updateSkill = function (index, value) {
        this.skillsList[index] = value;
    };
    ResumeBuilder.prototype.updateWorkExperience = function (index, field, value) {
        this.workExperienceList[index][field] = value;
    };
    ResumeBuilder.prototype.removeEducation = function (index) {
        this.educationList.splice(index, 1);
        this.renderEducation();
    };
    ResumeBuilder.prototype.removeSkill = function (index) {
        this.skillsList.splice(index, 1);
        this.renderSkills();
    };
    ResumeBuilder.prototype.removeWorkExperience = function (index) {
        this.workExperienceList.splice(index, 1);
        this.renderWorkExperience();
    };
    ResumeBuilder.prototype.downloadResume = function () {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var resumeContent = "\n      <h1>".concat(name, "</h1>\n      <p>Email: ").concat(email, " | Phone: ").concat(phone, "</p>\n      \n      <h2>Education</h2>\n      ").concat(this.educationList.map(function (edu) { return "\n          <p>".concat(edu.degree, " - ").concat(edu.school, " (").concat(edu.year, ")</p>\n      "); }).join(''), "\n       <h2>Skills</h2>\n            <ul>\n                ").concat(this.skillsList.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n            </ul>\n            \n            <h2>Work Experience</h2>\n            ").concat(this.workExperienceList.map(function (work) { return "\n                <h3>".concat(work.title, " at ").concat(work.company, "</h3>\n                <p>").concat(work.duration, "</p>\n                <p>").concat(work.description, "</p>\n            "); }).join(''), "\n        ");
        var blob = new Blob([resumeContent], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        a.click();
        URL.revokeObjectURL(url);
    };
    return ResumeBuilder;
}());
var resumeBuilder = new ResumeBuilder();
