var a = document.createElement('a');
a.setAttribute('href', 'https://medianinja.coursesuite.ninja');
a.setAttribute('target', '_blank');
a.setAttribute('title','Made with CourseSuite Media Ninja.')
a.setAttribute('style','position:absolute;top:10px;left:10px;');
var img = document.createElement('img');
img.setAttribute('src', 'https://fonts.coursesuite.ninja/coursesuite_glyph_watermark.svg');
img.setAttribute('width','51');
a.appendChild(img);
document.querySelector('.plyr').appendChild(a);