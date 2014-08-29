/*! Plugin options and other jQuery stuff */

// Responsive Nav
var navigation = responsiveNav("#site-nav", { // Selector: The ID of the wrapper
  animate: true, // Boolean: Use CSS3 transitions, true or false
  transition: 400, // Integer: Speed of the transition, in milliseconds
  label: "<i class='icon-reorder'></i> Menu", // String: Label for the navigation toggle
  insert: "before", // String: Insert the toggle before or after the navigation
  customToggle: "", // Selector: Specify the ID of a custom toggle
  openPos: "relative", // String: Position of the opened nav, relative or static
  jsClass: "js", // String: 'JS enabled' class which is added to <html> el
  init: function(){}, // Function: Init callback
  open: function(){}, // Function: Open callback
  close: function(){} // Function: Close callback
});

$('html').click(function() {
  //Hide the menus if visible
  navigation.toggle();
});

$('#site-nav').click(function(event){
    event.stopPropagation();
});

// FitVids options
$(function() {
	$("article").fitVids();

  var colorMatches = {};

  $('table.chart').each(function () {
    var data = {},
        colors = ['#36C', '#DC3912', '#F90', '#109618', '#909', '#0099C6', '#D47', '#6A0', '#434343', '#666', '#999', '#B7B7B7', '#CCC', '#D9D9D9', '#D9D9D9', '#D9D9D9', '#D9D9D9', '#D9D9D9'];

    $(this).find('tbody tr').each(function () {
      var value = parseFloat($(this).find('td:nth-child(2)').text());

      $(this).append('<td class="bar-chart"><div style="width: ' + value + '%; background-color: ' + colors.shift() + ';"></div></td>');
    });

    // $(this).after(createPie("pieName",'200px',"#FFFFFF",percentages.length,percentages,colors));
  });

  var entryContentDiv = $('.entry-content');
  if (entryContentDiv) {
    var entryWrapper = entryContentDiv.parents('.entry-wrapper'),
      takeMetaOnScreen = function () {
        entryWrapper.toggleClass('scroll-overlap', document.body.scrollTop > entryContentDiv.position().top);
      };

    $(window).on('scroll', takeMetaOnScreen);

    takeMetaOnScreen();
  }
});