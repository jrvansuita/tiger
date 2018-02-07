$(document).ready(function() {
  const listAdapter = require(_jsdir + 'adapter/ProductListAdapter.js');
  listAdapter.init();

  $('#feed-list').on("DOMNodeRemoved", function() {
    //Any DOM removed will invoke whit method
    $('#select-all').removeClass('active');
  });

  $('#copy').click(function() {
    var val = '';
    $(".sku").each(function() {
      val += '\n' + $(this).text();
    });

    Util.copySeleted(val);
  });

  //Mark as check
  $('#select-all').click(function() {
    var isSelect = !$(this).hasClass('active');
    $(this).toggleClass('active');
    listAdapter.selectAll(isSelect);
  });

  //Toogle the products
  $('#toggle-all').click(function() {
    listAdapter.toggleAll();
  });

  //Preesing ENTER will invoke a search action
  $('#search').keypress(function(e) {
    if (e.which == 13) {
      executeSearch();
      return false;
    }
  });

  $('#search-button').click(function() {
    executeSearch();
  });

  $('#publish').click(function() {
    if (listAdapter.saveSelecteds()) {
      require(_jsdir + 'control/menu-control.js').showPublish();
    } else {
      msg.warn(cnt.not_products_selected);
    }
  });

  $('#auto').click(function() {
    require(_jsdir + 'auto/Automate.js').autoPost();
  });


  function executeSearch() {
    $('#search-button').addClass('loading');
    listAdapter.execute($('#search').val(), function() {
      $('#search-button').removeClass('loading');
    });
  }

  restoreKeepValues();
  //Run the initial products
  executeSearch();
});

function storeKeepValues() {
  Keep.lastProductSearch($('#search').val());
}

function restoreKeepValues() {
  $('#search').val(Keep.lastProductSearch());
}