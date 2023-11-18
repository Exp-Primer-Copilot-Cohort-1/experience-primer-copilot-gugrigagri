function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var memberBtn = document.getElementById("memberBtn");
    var skillsBtn = document.getElementById("skillsBtn");
    member.style.display = "block";
    skills.style.display = "none";
    memberBtn.classList.add("active");
    skillsBtn.classList.remove("active");
}
