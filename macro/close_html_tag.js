/**********************************************************
**  Close Last Tag 3.0                                   **
***********************************************************
**  A "Sakura-Editor Macro" using WSH 5.6                **
**  For sakura.exe ver.1.6.2.0 and over                  **
**                               zlib/libpng ライセンス  **
**                      Copyright (C) 2004-2012 gis_dur  **
***********************************************************
**【動作】                                               **
**  カーソル位置より前にある HTML/XML タグを             **
**  ファイル先頭に向かって検索し、                       **
**  1. 終了タグのない開始タグ                            **
**  2. 閉じていないHTMLコメント        <!--      -->     **
**  3. 閉じていないCDATAブロック       <![CDATA[ ]]>     **
**  4. 閉じていないJSPスクリプトレット <%        %>      **
**  5. 閉じていないJSPコメント         <%--      --%>    **
**  がある場合、対応する終了タグを挿入します。           **
**  コメントタグ内は無視します。                         **
**********************************************************/

// サクラエディタ unicode 版の場合は true にする
var UNICODE_VER = true;
// xml モード（大文字・小文字を区別する）
var XML_MODE = false;
// 挿入した閉じタグの後ろにカーソルを移動するかどうか
var MOVE_CURSOR = true;
// 閉じタグを省略可能な要素名
var NO_CLOSE_TAG = "," +
[
  "area", "base", "basefont", "bgsound", "br",
  "col", "embed", "frame", "hr", "img",
  "input", "isindex", "keygen", "link", "meta",
  "nextid", "param", "spacer", "wbr"
].join(",") + ",";

/*********************************************************/

// シェル
if (typeof(Shell) == "undefined") {
  Shell = new ActiveXObject("WScript.Shell");
}

// 文字列拡張
if (typeof(String.prototype.is_wide) == "undefined") {
  String.prototype.is_wide = function() {
    if (UNICODE_VER) return false;
    if (this.length == 0) return false;
    var c = (this.length == 1) ? this : this.charAt(0);
    return (!c.match(/[ア-ンァィゥェォッャュョ゛゜ー、。「」・]/) && escape(c).length >= 4);
  };
}

(function() {
  if (!XML_MODE) {
    NO_CLOSE_TAG = NO_CLOSE_TAG.toUpperCase();
  }
  // タグを表す正規表現
  var TAG_CHARS = "s!\"#$%&\'()=~|^\\`{+*}<>?@[;],/";
  (function(){
    var tmp = "";
    for (var i=0; i<TAG_CHARS.length; i++) {
      tmp += "\\"+TAG_CHARS.charAt(i);
    }
    TAG_CHARS = "[^"+tmp+"]+";
  })();
  var TAGS_EXPRESSION = new RegExp();
  TAGS_EXPRESSION.compile("<!--|-->|<!\\[CDATA\\[|\\]\\]>|<%--|--%>|<%|%>|<"+TAG_CHARS+"([^>]*/>)?|<\\/"+TAG_CHARS+"", "g");
 
  // データ
  var stack = new Array();
  var ins_text = "";
  var err_text = "";
 
  // ステート
  var is_comment = false;
  var is_cdata = false;
  var is_jsp_comment = false;
  var is_jsp = false;
  var is_error = false;
 
  // テキストをすべて取得
  Editor.CancelMode(0);
  var cursorX = Number(Editor.ExpandParameter('$x')) - 1;
  var cursorY = Number(Editor.ExpandParameter('$y')) - 1;
  Editor.SelectAll(0);
  var all_text = Editor.GetSelectedString(0);
  Editor.CancelMode(0);
 
  // 改行を統一
  all_text = all_text.replace(/\r\n|\r|\n/g, "\n");
  var all_lines = all_text.split("\n");
  var num_lines = all_lines.length;
 
  // カーソル以前のテキストをすべて取得
  var tmp_text = all_lines[cursorY];
  if (tmp_text == null) {
    tmp_text = "";
  }
  if (num_lines-(cursorY+1) > 0) {
    all_lines.splice(cursorY+1, num_lines-(cursorY+1));
  }
  for (var i=0; i<cursorX; i++) {
    if (tmp_text.charAt(i).is_wide()) {
      cursorX--;
    }
  }
  all_lines[cursorY] = tmp_text.substring(0, cursorX);
 
  // タグを取得
  var all_tags = all_lines.join(" ").match(TAGS_EXPRESSION);
  var num_tags = (all_tags == null)? 0: all_tags.length;
 
  // 直前の開始タグを検索
  for (var i=num_tags-1; i>=0; i--) {
    // タグ文字列取得
    var now_text = all_tags[i];
    if (!XML_MODE) {
      now_text = now_text.toUpperCase();
    }
 
    // 特殊なステートにある場合
    if (is_comment) {
      if (now_text == "<!--") {
        is_comment = false;
      }
      continue;
    }
    else if (is_cdata) {
      if (now_text == "<![CDATA[") {
        is_cdata = false;
      }
      continue;
    }
    else if (is_jsp_comment) {
      if (now_text == "<%--") {
        is_jsp_comment = false;
      }
      continue;
    }
    else if (is_jsp) {
      if (now_text == "<%") {
        is_jsp = false;
      }
      continue;
    }
 
    // 特殊なステートに遷移する場合
    if (now_text == "-->") {
      is_comment = true;
      continue;
    }
    else if (now_text == "<!--") {
      ins_text = "-->";
      break;
    }
    else if (now_text == "]]>") {
      is_cdata = true;
      continue;
    }
    else if (now_text == "<![CDATA[") {
      ins_text = "]]>";
      break;
    }
    else if (now_text == "--%>") {
      is_jsp_comment = true;
      continue;
    }
    else if (now_text == "<%--") {
      ins_text = "--%>";
      break;
    }
    else if (now_text == "%>") {
      is_jsp = true;
      continue;
    }
    else if (now_text == "<%") {
      ins_text = "%>";
      break;
    }
    // 閉じタグ不要
    else if (now_text.indexOf("/>") != -1) {
      continue;
    }
    // 閉じタグのスタックに追加
    else if (now_text.indexOf("</") == 0) {
      now_text = now_text.substring(2);
      stack.push(now_text);
      continue;
    }
 
    // 要素名取得
    now_text = now_text.substring(1);
 
    // 省略可能なタグの場合
    if (NO_CLOSE_TAG.indexOf(","+now_text+",") != -1) {
      if (stack.length == 0) {
        continue;
      }
      else {
        tmp_text = stack.pop();
        if (now_text != tmp_text) {
          stack.push(tmp_text);
        }
        continue;
      }
    }
    // 通常のタグの場合
    else {
      if (stack.length == 0) {
        ins_text = "</" + all_tags[i].substring(1) + ">";
        break;
      }
      else {
        tmp_text = stack.pop();
        if (now_text != tmp_text) {
          is_error = true;
          err_text += "タグの包含関係が不正です。\r\n";
          err_text += "<"+now_text+"> ... ... </"+tmp_text+">\r\n";
          stack = new Array();
          break;
        }
      }
    }
  }
 
  // コメント中
  if (is_comment) {
    is_error = true;
    err_text += "コメントの開閉関係が不正です。\r\n";
  }
  // CDATA 中
  else if (is_cdata) {
    is_error = true;
    err_text += "CDATA ブロックの開閉関係が不正です。\r\n";
  }
  // JSP コメント中
  else if (is_jsp_comment) {
    is_error = true;
    err_text += "JSP コメントの開閉関係が不正です。\r\n";
  }
  // JSP 中
  else if (is_jsp) {
    is_error = true;
    err_text += "JSP スクリプトレットの開閉関係が不正です。\r\n";
  }
  // スタックに終了タグあり
  else if (stack.length > 0) {
    is_error = true;
    err_text += "開始タグのない終了タグが見つかりました。\r\n";
    for (var i=0; i<stack.length; i++) {
      err_text += "<"+stack[i]+">\r\n";
    }
  }
 
  // エラーダイアログ表示
  if (is_error) {
    Shell.Popup(err_text, 0, "文法エラー", 0);
    return;
  }
 
  // 終了タグの挿入
  Editor.InsText(ins_text);
 
  // カーソルを動かさない場合は、元の位置に戻す
  if (!MOVE_CURSOR) {
    for (var i=0; i<ins_text.length; i++) {
      Editor.Left(0);
    }
  }
})();