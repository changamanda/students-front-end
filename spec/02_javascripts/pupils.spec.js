describe("pupils.js", function() {
  beforeEach(function() {
    setFixtures('<div id = "index-container"><h1>Flatiron School Students</h1><p>Search:</p><input type="text" id="name-field"><br><ul id="students-list"></ul></div><div id = "student-container"><h1 id="student-name">Test Name</h1><p id="student-email"></p><p id="student-cohort"></p><a href = "#" class = "back-link">Home</a></div><div id = "cohort-container"><h1 id="cohort-name">Test Cohort</h1><ul id="cohort-students-list"></ul><a href = "#" class = "back-link">Home</a></div>');
  });

  describe("showContainer(name)", function() {
    it("will show index", function() {
      showContainer('#index-container');
      expect($('#student-container')).not.toBeVisible();
      expect($('#cohort-container')).not.toBeVisible();
      expect($('#index-container')).toBeVisible();
    });

    it("will show student", function() {
      showContainer('#student-container');
      expect($('#student-container')).toBeVisible();
      expect($('#cohort-container')).not.toBeVisible();
      expect($('#index-container')).not.toBeVisible();
    });

    it("will show cohort", function() {
      showContainer('#cohort-container');
      expect($('#student-container')).not.toBeVisible();
      expect($('#cohort-container')).toBeVisible();
      expect($('#index-container')).not.toBeVisible();
    });
  });

  describe("appendStudentLink(student, divName)", function() {
    beforeEach(function() {
      showContainer('#index-container');
      var student = {id: 1, name: "Newton Romaguera PhD", email: "newton.romaguera.phd@harber.name", cohort_id: 1};
      appendStudentLink(student, '#students-list');
    });

    it("appends student name as list item in given div", function() {
      expect($('#students-list').text()).toEqual('Newton Romaguera PhD');
    });

    it("links names to fragment ('#') in anchor with class 'student-link'", function(){
      expect($('a.student-link').attr('href')).toEqual('#');
    });
  });

  describe("listStudents(studentsArray, divName)", function(){
    beforeEach(function() {
      showContainer('#index-container');
      var students = [{cohort_id: 1, email: "newton.romaguera.phd@harber.name", id: 1, name: "Newton Romaguera PhD"}, {cohort_id: 1, email: "ankunding_brown@harris.biz", id: 2, name: "Brown Ankunding"}];
      listStudents(students, '#students-list');
    }); 

    it("calls on appendStudentLink for each student in the array", function() {
      expect($('#students-list').text()).toEqual("Newton Romaguera PhDBrown Ankunding");
    }); 
  });

  describe("showStudent(student)", function(){
    beforeEach(function() {
      showContainer('#student-container');
      var student = {id: 1, name: "Newton Romaguera PhD", email: "newton.romaguera.phd@harber.name", cohort: {id: 1, name: "Ruby-000"}};
      showStudent(student);
    });


    it("displays the student name in h1#student-name", function() {
      expect($('h1#student-name').text()).toEqual("Newton Romaguera PhD");
    });

    it("displays the student email in p#student-email", function() {
      expect($('p#student-email').text()).toEqual("Email: newton.romaguera.phd@harber.name");
    });

    it("displays the student cohort in p#student-cohort", function() {
      expect($('p#student-cohort').text()).toEqual("Cohort: Ruby-000");
    });

    it("links cohort to fragment in anchor with id 'cohort-link'", function(){
      expect($('a#cohort-link').attr('href')).toEqual('#');
    });

    it("gives #cohort-link a 'data-id' of the cohort's id", function(){
      expect($('a#cohort-link').attr('data-id')).toEqual('1');
    });
  });

  describe("resetIndex()", function(){
    it("clears the text box", function() {
      showContainer('#index-container');
      $("#name-field").val("Hello");
      resetIndex();

      expect($("#name-field").val()).toEqual("");
    }); 
  });

  describe("replaceCohortName(name)", function(){
    it("replaces the cohort name in #cohort-name", function() {
      showContainer('#cohort-container');
      replaceCohortName('Ruby-000');

      expect($('#cohort-name').text()).toEqual('Ruby-000');
    }); 
  });
});