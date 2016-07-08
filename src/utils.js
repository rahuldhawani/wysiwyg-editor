
export function saveSelection() {
  if (window.getSelection) {
    let sel = window.getSelection();

    if (sel.getRangeAt && sel.rangeCount) {
      let ranges = [];
      for (let i = 0, len = sel.rangeCount; i < len; ++i) {
        ranges.push(sel.getRangeAt(i));
      }
      return ranges;
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
}
export function restoreSelection(selection, extend) {
  let savedSel = selection;
  if (savedSel) {
    if (window.getSelection) {
      let sel = window.getSelection();
      sel.removeAllRanges();
      for (var i = 0, len = savedSel.length; i < len; ++i) {
        sel.addRange(savedSel[i]);
      }
      if(extend) {

      }
    } else if (document.selection && savedSel.select) {
      savedSel.select();
    }
  }
}

export function pasteHtmlAtCaret (html, selection)  {
  var sel, range;
  sel = selection;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(), node, lastNode;
      while ( (node = el.firstChild) ) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        console.log('dfdfdf::'+ range[0]);
      }
    }
  } else if (document.selection && document.selection.type != "Control") {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
}


export function getDataUri(file, callback)  {
  var image = new Image();
  image.src = file.preview;
  image.crossOrigin="anonymous";

  image.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

    canvas.getContext('2d').drawImage(this, 0, 0);
    console.log(canvas.toDataURL('image/png'));

    callback(canvas.toDataURL('image/png'), file.name);
  };
}
export function videoUrl(inputLink) {

  if (inputLink.match(/youtube/gi)) {
    return inputLink.replace("watch?v=", "embed/")
  }
  if (inputLink.match(/vimeo/gi)) {
    let id = inputLink.match(/\d+/g);
    return '//player.vimeo.com/video/' + id[id.length-1];
  }
}

function removeReactId(str) {
  console.log('before');
  console.log(str);
  var a= str.replace(/(data-)(\w*)=(\")(.*?)(\")/ig, '');
  console.log(a);
  return a;
}
function containerize(str) {
  console.log('after container');
  var a=`<div style="overflow: auto">${str}</div>`;
  console.log(a);
  return a;
}

export function _serialize(html) {
  return containerize(removeReactId(html));
}


export function isSelectionFromThisEditor(s, parentEditorElement) {
  if (!s) {
    return false;
  }

  let flag = true;
  let el2 = s[0].commonAncestorContainer;
  console.log(!el2 === document.body);

  while (flag && el2 !== document.body) {
    console.log(flag && !el2 === document.body);
    if (el2.parentElement === parentEditorElement) {
      return true
    }
    else el2 = el2.parentElement;
  }

  return false;
}
