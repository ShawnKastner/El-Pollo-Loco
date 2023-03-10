class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 120;
    percentage = 100;

    // loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }

    //  drawFrame(ctx) {
    //      if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) {
    //          ctx.beginPath();
    //          ctx.lineWidth = '5';
    //          ctx.strokeStyle = 'blue';
    //          ctx.rect(this.x, this.y, this.width, this.height);
    //          ctx.stroke();
    //      }
    //  }

    /**
    * 
    * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    //setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}