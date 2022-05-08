song1 = " "
song2 = " "
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0
score_RightWrist = 0
song1status = " "
song2status = " "

function preload() {
    song1 = loadSound("Industry Baby.mp3")
    song2 = loadSound("Enemy.mp3")
}



function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}


function draw() {
    image(video, 0, 0, 600, 600)

    fill("#000000")
    stroke("#FF0000")

    circle(leftWristX, leftWristY, 20)
    song1status = song1.isPlaying();
    song2status = song2.isPlaying()

    if (score_leftWrist > 0.2) {
        song2.stop()

        if (song1status == false) {
            song1.play()
            document.getElementById("song").innerHTML = " Enemy by Imagine Dragons "
        }
    }

    circle(rightWristX, rightWristY, 20);

    if (score_RightWrist > 0.2) {
        song1.stop()

        if (song2status == false) {
            song2.play()
            document.getElementById("song").innerHTML = " Industry Baby - Jack Harlow and Lil Nas X "
        }
    }


}

function modelLoaded() {
    console.log('poseNet is initialized')
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY)

        score_leftWrist = results[0].pose.keypoints[9].score
        console.log("score_leftWrist " + score_leftWrist)
        score_RightWrist = results[0].pose.keypoints[9].score
        console.log("score_RightWrist " + score_RightWrist)
    }
}