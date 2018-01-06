
$(document).ready(function(){
  const listAdapter = require(_jsdir + 'adapter/ProductListAdapter.js');
  listAdapter.init();

  $('#feed-list').on("DOMNodeRemoved",function(){
    //Any DOM removed will invoke whit method
    $('#select-all').removeClass('active');
  });

  //Mark as check
  $('#select-all').click(function(){
    var isSelect = !$(this).hasClass('active');
    $(this).toggleClass('active');
    listAdapter.selectAll(isSelect);
  });

  //Toogle the products
  $('#toggle-all').click(function(){
    listAdapter.toggleAll();
  });

  //Preesing ENTER will invoke a search action
  $('#search').keypress(function (e) {
    if (e.which == 13) {
      executeSearch();
      return false;
    }
  });

  $('#search-button').click(function (){
    executeSearch();
  });

  $('#publish').click(function(){
    listAdapter.saveSelecteds();
    require(_jsdir + 'control/menu-control.js').showPublish();
  });

  $('#auto').click(function(){
    require(_jsdir + 'auto/Automate.js').autoPost();
  });


  function executeSearch() {
    $('#search-button').addClass('loading');
    listAdapter.execute($('#search').val(), function (){
      $('#search-button').removeClass('loading');
      //restoreAttrs(listAdapter.hasSearchAttrs());
    });
  }

  restoreKeepValues();
  //Run the initial products
  executeSearch();
});

function storeKeepValues(){
  Keep.lastProductSearch($('#search').val());
}

function restoreKeepValues(){
  $('#search').val(Keep.lastProductSearch());
}

// function restoreAttrs(hasAttrs){
//   if (!hasAttrs){
//     var arr = Keep.lastAttrsSearch();
//     arr.forEach(function (item){
//       var arr = item.split('-');
//       $('strong[field="' + arr[0] + '"][value="' + arr[1] + '"]').first().click();
//     });
//   }
// }
