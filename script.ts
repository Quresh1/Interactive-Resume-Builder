interface Education {
  degree: string;
  school: string;
  year: string;
}

interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

class ResumeBuilder {
  private educationList: Education[] = [];
    private skillsList: string[] = [];
    private workExperienceList: WorkExperience[] = [];

    constructor() {
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        document.getElementById('add-education')?.addEventListener('click', () => this.addEducation());
        document.getElementById('add-skill')?.addEventListener('click', () => this.addSkill());
        document.getElementById('add-work')?.addEventListener('click', () => this.addWorkExperience());
        document.getElementById('download-resume')?.addEventListener('click', () => this.downloadResume());
    }
    private addEducation(): void {
      const educationItem: Education = {
          degree: '',
          school: '',
          year: ''
      };
      this.educationList.push(educationItem);
      this.renderEducation();
  }

  private addSkill(): void {
      this.skillsList.push('');
      this.renderSkills();
  }
  private addWorkExperience(): void {
    const workItem: WorkExperience = {
        title: '',
        company: '',
        duration: '',
        description: ''
    };
    this.workExperienceList.push(workItem);
    this.renderWorkExperience();
}
private renderEducation(): void {
  const educationListElement = document.getElementById('education-list');
  if (educationListElement) {
      educationListElement.innerHTML = '';
      this.educationList.forEach((edu, index) => {
          const eduElement = document.createElement('div');
          eduElement.innerHTML = `
              <input type="text" placeholder="Degree" value="${edu.degree}" onchange="resumeBuilder.updateEducation(${index}, 'degree', this.value)">
              <input type="text" placeholder="School" value="${edu.school}" onchange="resumeBuilder.updateEducation(${index}, 'school', this.value)">
              <input type="text" placeholder="Year" value="${edu.year}" onchange="resumeBuilder.updateEducation(${index}, 'year', this.value)">
              <button class="remove-btn" onclick="resumeBuilder.removeEducation(${index})">Remove</button>
          `;
          educationListElement.appendChild(eduElement);
      });
  }
}
private renderSkills(): void {
  const skillsListElement = document.getElementById('skills-list');
  if (skillsListElement) {
      skillsListElement.innerHTML = '';
      this.skillsList.forEach((skill, index) => {
          const skillElement = document.createElement('div');
          skillElement.innerHTML = `
              <input type="text" placeholder="Skill" value="${skill}" onchange="resumeBuilder.updateSkill(${index}, this.value)">
              <button class="remove-btn" onclick="resumeBuilder.removeSkill(${index})">Remove</button>
          `;
          skillsListElement.appendChild(skillElement);
      });
  }
}
private renderWorkExperience(): void {
  const workListElement = document.getElementById('work-experience-list');
  if (workListElement) {
      workListElement.innerHTML = '';
      this.workExperienceList.forEach((work, index) => {
          const workElement = document.createElement('div');
          workElement.innerHTML = `
              <input type="text" placeholder="Job Title" value="${work.title}" onchange="resumeBuilder.updateWorkExperience(${index}, 'title', this.value)">
              <input type="text" placeholder="Company" value="${work.company}" onchange="resumeBuilder.updateWorkExperience(${index}, 'company', this.value)">
              <input type="text" placeholder="Duration" value="${work.duration}" onchange="resumeBuilder.updateWorkExperience(${index}, 'duration', this.value)">
              <textarea placeholder="Job Description" onchange="resumeBuilder.updateWorkExperience(${index}, 'description', this.value)">${work.description}</textarea>
              <button class="remove-btn" onclick="resumeBuilder.removeWorkExperience(${index})">Remove</button>
          `;
          workListElement.appendChild(workElement);
      });
  }
}
updateEducation(index: number, field: keyof Education, value: string): void {
  this.educationList[index][field] = value;
}

updateSkill(index: number, value: string): void {
  this.skillsList[index] = value;
}

updateWorkExperience(index: number, field: keyof WorkExperience, value: string): void {
  this.workExperienceList[index][field] = value;
}
removeEducation(index: number): void {
  this.educationList.splice(index, 1);
  this.renderEducation();
}

removeSkill(index: number): void {
  this.skillsList.splice(index, 1);
  this.renderSkills();
}

removeWorkExperience(index: number): void {
  this.workExperienceList.splice(index, 1);
  this.renderWorkExperience();
}
private downloadResume(): void {
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;

  let resumeContent = `
      <h1>${name}</h1>
      <p>Email: ${email} | Phone: ${phone}</p>
      
      <h2>Education</h2>
      ${this.educationList.map(edu => `
          <p>${edu.degree} - ${edu.school} (${edu.year})</p>
      `).join('')}
       <h2>Skills</h2>
            <ul>
                ${this.skillsList.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            
            <h2>Work Experience</h2>
            ${this.workExperienceList.map(work => `
                <h3>${work.title} at ${work.company}</h3>
                <p>${work.duration}</p>
                <p>${work.description}</p>
            `).join('')}
        `;
        const blob = new Blob([resumeContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        a.click();
        URL.revokeObjectURL(url);
    }
}
const resumeBuilder = new ResumeBuilder();
