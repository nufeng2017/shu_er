/***
 * 公共背景图
 * ***/

const background = {

  //向下箭头
  'downArrow':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAYAAAA/33wPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI4M0M4MUQ2NDBBMTFFQTlGOUJEQjJCREU3NjY5RTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDI4M0M4MUU2NDBBMTFFQTlGOUJEQjJCREU3NjY5RTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMjgzQzgxQjY0MEExMUVBOUY5QkRCMkJERTc2NjlFNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMjgzQzgxQzY0MEExMUVBOUY5QkRCMkJERTc2NjlFNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjY7BoYAAAB7SURBVHjaYpw5c6YAAwPDJSBWT09P/85AAgDqZQRSK4G4nQmo+QOQ0QTEN4ESnGQYAgIXGJEkUoBUHTEuQzMkHKj+PyOaAoKGYTMExGDEohCnYbgMwWoQLsPwGYLTIHTDgPgHPkPwGoRm2Al8hhA0CMkwN3yGgABAgAEAwHxKoABVg1oAAAAASUVORK5CYII=',
  'arcBg':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAiCAIAAACPyst7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowZmRkOTcxMi1jNDYyLTZkNDEtOGNiNC01ODYzNWIyNGQ2YTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTZBQTQ2NEE2NzJBMTFFQUE2NTZGRTA1RUQxQjJBM0IiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTZBQTQ2NDk2NzJBMTFFQUE2NTZGRTA1RUQxQjJBM0IiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTRlNWUxZTYtNDg3Mi03YjRkLWI4MjItZGU0YWI2YTNmMTc4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBmZGQ5NzEyLWM0NjItNmQ0MS04Y2I0LTU4NjM1YjI0ZDZhMyIv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'
}

export default background;