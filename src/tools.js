const tools = {
  /*fontSize : {
   command   : 'fontSize',
   args      : ['8', '9', '10', '11', '12', '14', '18', '24'],
   titles    : ['8', '9', '10', '11', '12', '14', '18', '24'],
   titleType : 'text',
   fa        : 'text-height',
   type      : 'dropdown',
   action    : 'custom'
   },*/
  formatBlock   : {
    command   : 'formatBlock',
    args      : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'],
    titles    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'],
    titleType : 'text',
    fa        : 'header',
    type      : 'dropdown',
    name : 'Format'

  },
  fonts         : {
    command   : 'fontName',
    args      : ['Helvetica Neue', 'Arial', 'Arial Black', 'Helvetica', 'Lucida Grande', 'Tahoma', 'Times New Roman', 'Verdana', 'Georgia'],
    titles    : ['Helvetica Neue', 'Arial', 'Arial Black', 'Helvetica', 'Lucida Grande', 'Tahoma', 'Times New Roman', 'Verdana', 'Georgia'],
    titleType : 'text',
    fa        : 'font',
    type      : 'dropdown',
    name : 'Fonts'

  },
  align         : {
    command   : ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull'],
    args      : null,
    titleType : 'fa',
    titles    : ['align-left', 'align-right', 'align-center', 'align-justify'],
    fa        : 'align-left',
    type      : 'dropdown',
    name      : 'Align'

  },
  bold          : {
    command : 'bold',
    args    : null,
    fa      : 'bold',
    name : 'Bold'
  },
  strikeTrough  : {
    command : 'strikeThrough',
    args    : null,
    fa      : 'strikethrough',
    name : 'Strike'
  },
  italics       : {
    command : 'italic',
    args    : null,
    fa      : 'italic',
    name : 'Italics'
  },
  orderedList   : {
    command : 'insertOrderedList',
    args    : null,
    fa      : 'list-ol',
    name : 'Ordered List'
  },
  unorderedList : {
    command : 'insertUnorderedList',
    args    : null,
    fa      : 'list-ul',
    name : 'Unordered List'
  },
  underline     : {
    command : 'underline',
    args    : null,
    fa      : 'underline',
    name : 'Underline'
  },
  anchor        : {
    command : 'createLink',
    args    : 'link',
    fa      : 'link',
    type    : 'link',
    name : 'Link'
  },
  image         : {
    args   : 'link',
    action : 'click',
    fa     : 'picture-o',
    type   : 'image',
    name : 'Image'
  },
  video         : {
    args   : 'link',
    action : 'click',
    fa     : 'video-camera',
    type   : 'video',
    name : 'Video'
  }
};
export default tools;