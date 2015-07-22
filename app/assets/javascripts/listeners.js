'use strict'

function addSearchListener(){
  $("#name-field").keyup(function(e) {
    var val = $(this).val();
    getStudentsByQuery(val);
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

function addListenerOnBackLink(){
  $('.back-link').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();

    resetIndex();
    showContainer('#index-container');
  });
}