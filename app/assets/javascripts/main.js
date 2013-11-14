console.log("Im ready");

// event listener added to edit button/link that will render an edit view for the snippet

$(document).ready(function(){

  //takes all buttons with class "seemorebuttons" and adds event listener "click"
  $('.see-more-button').on("click", function(){
    //takes "this" and finds closest parent with class "snippet" which then finds child with class "snippet-notes" and adds slide toggle
    $(this).closest('.snippet').find('.snippet-notes').slideToggle(200);
  });

  $(".edit-button").on("click", function(e){
      //establishes target on the event listener to the closest element with class of snippet
      var $target = $(e.target).closest('.snippet');
      //captures the id attribute of the target
      var snippet_id = $target.attr('id');
      //finds the body/text of the snippet
      var $snippetBody = $(this).closest('.snippet').find('.snippet-body');
      //changes the notes and snippt paragraphs to editable text area
      $snippetBody.replaceWith($('<textarea>' + $snippetBody.html() + '</textarea>').attr("id", "body-"+snippet_id));
      //grabs the snippet-notes element and sets it to a variable
      var $snippetNotes = $(this).closest('.snippet').find('.snippet-notes-text');
      //change the snippets notes to a text area
      $snippetNotes.replaceWith($('<textarea>' + $snippetNotes.html() + '</textarea>').attr("id", "notes-"+snippet_id));
      //apends the button to the snippet div
      $(this).closest('.snippet').append($("<button class ='btn btn-secondary edit-snippet-button'>").html("Submit Edits"));

  });

    $(".snippet").on("click", ".edit-snippet-button", function(e){
      e.preventDefault();
      //establishes target on the event listener to the closest element with class of snippet
      var $target = $(e.target).closest('.snippet');
      var snippet_id = $target.attr('id');
      var editedSnippet = $("#body-"+snippet_id).val();
      var editedNotes = $("#notes-"+snippet_id).val();
      debugger
      var snippetUpdate = {snippet: {notes: editedNotes, body: editedSnippet}}
      $.ajax({
      type: "PUT",
      url: "/snippets/"+ snippet_id,
      data: snippetUpdate,
      dataType: "json"
      }).done(function(response){
        console.log(response);
      });
    });


    $(".delete-button").on("click", function(e){
      e.preventDefault();
      var $target = $(e.target).closest('.snippet');
      var snippet_id = $target.attr('id')
      $.ajax({
      type: "DELETE",
      url: "/snippets/"+ snippet_id,
      dataType: "json"
      }).done(function(){
        $("#"+snippet_id).remove();
      })
    });

  // resizeIt = function(input) {
  //     var str = $(input).value;
  //     var cols = $(input).cols;

  //     var linecount = 0;
  //     $A(str.split("\n")).each( function(l) {
  //       linecount += Math.ceil( l.length / cols ); // take into account long lines
  //     } )
  //     $(input).rows = linecount + 1;
  //   };

  // function resizeTextArea (input) {
  //   input.height(input.scrollHeight);
  // }



});
