


module.exports =  {
  build : function(element, onAddCallBack, onRemoveCallBack) {
    element
    .dropdown({
      values: getTestValues(),
      allowAdditions: true,
      minCharacters: 4,
      placeholder: 'Hashtags',
      onAdd : function(addedValue, addedText, $addedChoice){
        onAddCallBack(addedValue);
      },
      onRemove: function(removedValue, removedText, $removedChoice){
        onRemoveCallBack(removedValue);
      },
      onLabelCreate: function(value, text){
        //Remove spaces
        var v = value.replace(/\s/g, '');
        var html  = $(this).html().replace(text, v);
        return $(this).attr('data-value', v).html(html);
      }
    });
  }
};


function getTestValues(){
  return [
    {
      name: 'Teste1',
      value: 'Teste1',
    },
    {
      name     : 'Teste2',
      value    : 'Teste2',
    }
  ];
}
