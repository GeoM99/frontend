let gulp = require('gulp')
let prefix = require('gulp-autoprefixer')
let pug = require('gulp-pug')
let sass = require('gulp-sass')
let babel = require('gulp-babel')
let imagemin = require('gulp-imagemin')
let pngquant = require('imagemin-pngquant')
let svgmin = require('gulp-svgmin')
let webp = require('gulp-webp')
let usereft = require('gulp-useref')
let concat  = require('gulp-concat')
let uncss = require('gulp-uncss')
let cleanCSS = require('gulp-clean-css')
let uglify = require('gulp-uglify')
let htmlmin = require('gulp-htmlmin')


let directories = {
  src : 'src',
  dist : 'dist',
  node_modules : 'node_modules'
}



let files = {

  CSS : [
    
    `${directories.node_modules}/animate.css/animate.css`,
    `${directories.node_modules}/font-awesome/css/font-awesome.min.css`,
    `${directories.node_modules}/owl.carousel/dist/owl.carousel.min.css`,
    `${directories.node_modules}/owl.carousel/dist/owl.default.min.css`,
    `${directories.dist}/css/core.css`
  ],

  miniCSS : 'build.min.css',
  JS : [
    `${directories.node_modules}/jquery/dist/jquery.min.js`,
    `${directories.node_modules}/owl.carousel/dist/owl.carousel.min.js`,
    `${directories.node_modules}/wowjs/dist/wow.min.js`,
    `${directories.dist}/js/scripts.js`

  ],
  miniJS : 'build.min.js',
  fonts : [`${directories.node_modules}/font-awesome/fonts/*.*`,


  ]

}


let options = {
  pug : {
    pretty : true,
    locals : {}
  },

  sass : { 
    outputStyle: 'compressed' 
  },
  es6 : { 
    presets:['es2015'] 
  },
  
  imagemin :{
    progressive : true,
    use : [pngquant()]
  },

  svgmin : {
    plugins : [
      {convertColors : false}, 
      {removeAttrs : { 
        attrs : ['fill'] 
      } 
    }
  ]
 },

 uncss : { 
   html : [`${directories.dist}/*.html`]
  },
autoprefixer : {
  browsers : ['last 5 versions' ],
  cascade : false
  
  },
  htmlmin : { collapseWithSpace : true }

}




//Tarea para compilar gulp

gulp.task('pug', ()=> {
  gulp
    .src(`${directories.src}/pug/*.pug`)
    .pipe(pug(options.pug))
    .pipe(gulp.dest(`${directories.dist}`))
})


//Tarea para compilar sass

gulp.task('sass', ()=>{
  gulp
    .src(`${directories.src}/sass/*.sass`)
    .pipe(sass(options.sass))
    .pipe(gulp.dest(`${directories.dist}/css`))
})

//Tarea compilar es6

gulp.task('es6', ()=>{
  gulp
    .src(`${directories.src}/es6/*.js`)
    .pipe(babel(options.es6))
    .pipe(gulp.dest(`${directories.dist}/js`))
  
})


//Tareas  minificacion de imagenes

gulp.task('img', ()=>{
  gulp
    .src(`${directories.src}/img/**/*.+(png|jpeg|jpg|gif)`)
    .pipe(imagemin(options.imagemin))
    .pipe(gulp.dist(`${directories.dist}/img`))
})

gulp.task('svg', ()=>{
  gulp
    .src(`${directories.src}/img/svg/*.svg`)
    .pipe(svgmin(options.svgmin))
    .pipe(gulp.dest(`${directories.dist}/img/svg`))
})

gulp.task('webp', ()=>{
  gulp
    .src(`${directories.src}/img/**/*.+(png|jpeg|jpg)`)
    .pipe(webp())
    .pipe(gulp.dest(`${directories.dist}/img/webp`))
})

gulp.task('fonts', ()=>{
  gulp
    .src(`${files.fonts}`)
    .pipe(gulp.dest(`${directories.dist}/fonts`))

})


//Tarea minificacion css
gulp.task('css', ()=>{
  gulp
    .src(files.CSS)
    .pipe(concat(files.miniCSS))
    .pipe(uncss(options.uncss))
    .pipe(prefix(options.autoprefixer))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${directories.dist}/css`))

  })

//Tarea minificacion javascript

gulp.task('js', ()=>{
  gulp
    .src(`${files.JS}`)
    .pipe(concat(`${files.miniJS}`))
    .pipe(uglify())
    .pipe(gulp.dest(`${directories.dist}/css`))

  })


//Tarea minificacion Html
gulp.task('html', ()=>{
  gulp
    .src(`${directories.dist}/*.html`)
    .pipe(usereft())
    .pipe(htmlmin(options.htmlmin))
    .pipe(gulp.dest(`${directories.dist}`))
})

