
サクラエディタ用CSSシンタックスハイライト ver.0.01
(C) 2011  momdo

●これは何？
サクラエディタ
http://sakura-editor.sourceforge.net/
のCSSシンタックス・ハイライトを設定するためのファイル群です。

自分が軽く検索した中では、
CSS2.1キーワード（ハイフン版）
http://sakura.qp.land.to/?Customize%2F%C5%EA%B9%C6%2F65
サクラエディタ用 CSSキーワード定義ファイル Rev1.00
http://kaede.blog.abk.nu/sakura-css

がありましたが、より高度なハイライトを試してみたかったので、
一から作ってみたものです。

準拠しているつもりのCSSは少なくとも、
-CSS2.1
-CSS Color Level 3
-CSS Namespaces
-Selectors Level 3
-CSS Values and Units Level 3
となります。

加えて、webkitがベンダープレフィックス付きでサポートしているプロパティを
プレフィックスなしでかつ、別の色でハイライトできます。

●導入方法
自分自身が導入するとき結構混乱したのでメモ。

0)正規表現キーワードを使用するので、bregexp(bregonig.dll)が必要になります。
導入していない場合は、下記URLから入手してください。
http://sakura.qp.land.to/?Install

1)タイプ別設定一覧で導入
設定(O)->タイプ別設定一覧
http://sakura-editor.sourceforge.net/htmlhelp2/HLP000072.html
にあるように、インポートボタンを押してください。

すると、ファイル選択画面が開きますので、CSS.iniをインポートしてください。


お好みで、
強調キーワード4にHTML（サクラエディタに用意されている）をセットしてください。
http://sakura.qp.land.to/?Customize%2F%B6%AF%C4%B4%A5%AD%A1%BC%A5%EF%A1%BC%A5%C9

また、色分け等は好みがあると思いますので、好きなように調整してください。

●内容物
CSSProp.kwd
プロパティ強調ファイル

CSSProp_d.kwd
webkit先行実装プロパティ強調ファイル

CSSValue.kwd
値強調ファイル

css3.col
カラー定義ファイル

css3.rkw
正規表現キーワードファイル

LICENSE.txt
MITライセンスファイル

LICENSE-APPLE.txt
修正BSDライセンスファイル

readme.txt
このファイル

●CSSProp.kwdとCSSProp_d.kwd、CSSValue.kwdについて
CSS2.1相当のプロパティと値として、webkitから流用しました。ファイルのURLと
リビジョンは次のとおりです。

http://trac.webkit.org/browser/trunk/Source/WebCore/css/CSSPropertyNames.in
Revision 101078
http://trac.webkit.org/browser/trunk/Source/WebCore/css/CSSValueKeywords.in
Revision 100570
http://trac.webkit.org/browser/trunk/Source/WebCore/css/SVGCSSValueKeywords.in
Revision 92792

ライセンスについては、
http://trac.webkit.org/browser/trunk/Source/WebCore/LICENSE-LGPL-2.1
によると、流用したファイルはLGPLの範囲外のようなので、BSDスタイルのライセンスが
適用されるはずです。
http://trac.webkit.org/browser/trunk/Source/WebCore/LICENSE-APPLE

●css3.rkwについて
以下のものをCSS文法に似せてでっち上げました。
正規表現はbregonig.dllで通るperl互換になっているはずなので、
サクラエディタ以外でも使えると思われます。

○ベンダープレフィックス
vender-prefixをCSS2.1の参考情報に基づき判定します。
http://www.w3.org/TR/CSS2/syndata.html#vendor-keyword-history
色指定を正規表現キーワード1に設定。

○セレクタ
selectorは、擬似クラス、擬似要素を判定します。
http://www.w3.org/TR/selectors/

属性セレクタを簡易判定します。
http://www.w3.org/TR/selectors/#attribute-selectors

言語擬似クラス :lang()セレクタは、BCP47(RFC5646)の簡易判定をします。
http://www.rfc-editor.org/rfc/bcp/bcp47.txt

擬似クラス :nth-child(n)、:nth-last-child(n)、:nth-of-type(n)、:nth-last-of-type(n)セレクタは、
'n'の簡易判定をします。
http://www.w3.org/TR/selectors/#nth-child-pseudo
色指定を正規表現キーワード2に設定。

○色
CSS Color Module Level 3を判定します。
http://www.w3.org/TR/css3-color/

#rgb、#rrggbbを判定します。
rgb()、rgba()、hsl()、hsla()はガモットを考慮した簡易判定になっています。
拡張カラーキーワードについては、CSSValue.kwdでマッチングします。
色指定を正規表現キーワード3に設定。

○at-rule
at-ruleを判定します。Operaのドキュメントから流用。
http://jp.opera.com/docs/specs/presto28/css/atrules/
色指定を正規表現キーワード4に設定。

○単位
css3 unitをパーセンテージ、各種単位について簡易判定します。
http://dev.w3.org/csswg/css3-values/
色指定を正規表現キーワード5に設定。


●更新履歴
2011-11-24 ver.0.01
・とりあえず作って公開してみた。

●ライセンス
CSSProp.kwd、CSSProp_d.kwd、CSSValue.kwdはwebkitのライセンス、すなわち
修正BSDライセンスを適用するとします。修正BSDライセンスは同梱の
LICENSE-APPLE.txtを参照してください。

それ以外のファイルはMITライセンスに従うものとします。同梱のLICENSE.txtを
参照してください。


●連絡先
作者：
momdo（もんど）

E-mail:
xmomdo@gmail.com

ホームページ：
http://d.hatena.ne.jp/momdo/
http://momdo.s35.xrea.com/

twitter：
http://twitter.com/momdo_

ご意見等ありましたら、メールかツイッターでお願いいたします。
