module.exports = {
  build: function(element) {
    element.emojioneArea({
      search: true,
      searchPlaceholder: "Search",
      pickerPosition: "bottom",
      tones: false,
      hideSource: true,
      shortnames: true,
      recentEmojis: true,
      buttonTitle: "Pick an Emoji"
    });
  },

  onInput: function(element, callback) {
    element.emojioneArea()[0].emojioneArea
      .on('keyup', function() {
        callback();
      })
      .on('emojibtn.click', function() {
        callback();
      });
  },

  text: function(element, text) {
    if (element)
      if (text != undefined) {
        element.emojioneArea()[0].emojioneArea.setText(text);
      } else {
        return element.emojioneArea()[0].emojioneArea.getText();
      }
  },

};