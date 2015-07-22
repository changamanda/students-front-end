'use strict'

function showContainer(name){
  $('#student-container').hide();
  $('#cohort-container').hide();
  $('#index-container').hide();
  $(name).show();
}

function appendStudentLink(student, divName){
  $(divName).append("<li><a class='student-link' href = '#' data-id = '" + student.id + "'>" + student.name + "</a></li>");
}

function listStudents(studentsArray, divName){
  studentsArray.forEach(function(student){
    appendStudentLink(student, divName);
  });  
}

function showStudent(student){
  $('#student-name').text(student.name);
  $('#student-email').text("Email: " + student.email);
  $('#student-cohort').html("Cohort: <a href = '#' id = 'cohort-link' data-id = '" + student.cohort.id + "'>" + student.cohort.name + "</a>");  
}

function resetIndex(){
  $("#name-field").val("");
  $("#name-field").keyup();  
}

function replaceCohortName(name){
  $('#cohort-name').text(name);
}