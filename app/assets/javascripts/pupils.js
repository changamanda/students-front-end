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

function getStudents(){
  $.ajax({
    method: "GET",
    url: "/students"
  })
  .done(function(studentsArray) {
    listStudents(studentsArray, '#students-list');
  });
}

function showStudent(student){
  $('#student-name').text(student.name);
  $('#student-email').text("Email: " + student.email);
  $('#student-cohort').html("Cohort: <a href = '#' id = 'cohort-link' data-id = '" + student.cohort.id + "'>" + student.cohort.name + "</a>");  
}

function getStudent(id){
  $.ajax({
    method: "GET",
    url: "/students/" + id
  })
  .done(function(student) {
    showStudent(student);
  });
}

function addListenerOnStudentLink(){
  $('body').on('click', '.student-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    var id = $(this).data("id");
    getStudent(id);
    showContainer('#student-container');
  });
}

function resetIndex(){
  $("#name-field").val("");
  $("#name-field").keyup();  
}

function addListenerOnBackLink(){
  $('.back-link').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();

    resetIndex();
    showContainer('#index-container');
  });
}

function getStudentsForCohort(id){
  $.ajax({
    method: "GET",
    url: "/cohorts/" + id + "/students"
  })
  .done(function(message){
    $('#cohort-students-list').empty();
    listStudents(message, '#cohort-students-list');
  });
}

function replaceCohortName(name){
  $('#cohort-name').text(name);
}

function getCohort(id){
  $.ajax({
    method: "GET",
    url: "/cohorts/" + id
  })
  .done(function(message) {
    replaceCohortName(message.name)
  });
}

function addListenerOnCohortLink(){
  $('#student-cohort').on('click', 'a', function(e){
    e.preventDefault();
    e.stopPropagation();

    var id = $(this).data("id");
    getCohort(id);
    getStudentsForCohort(id);
    showContainer('#cohort-container');
  });
}

function getStudentsByQuery(query){
  $.ajax({
    method: "GET",
    url: "/students?q=" + query
  })
  .done(function(message) {
    $('#students-list').empty();
    listStudents(message, '#students-list');
  });
}

function addSearchListener(){
  $("#name-field").keyup(function(e) {
    var val = $(this).val();
    getStudentsByQuery(val);
  });
}

$(document).ready(function(){
  showContainer('#index-container');
  getStudents();
  addListenerOnStudentLink();
  addListenerOnBackLink();
  addListenerOnCohortLink();
  addSearchListener()
});