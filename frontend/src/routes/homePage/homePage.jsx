import style from "./homePage.module.css"

export default function HomePage(){
    return(
        <section className={style.homePage}>
            <div className={style.bannerUpSide}>
                <h1>TRACK YOUR <br/>FITNESS</h1>
                <h1>JOURNEY</h1>
            </div>

            <div className={style.bannerDownSide}>
                <div>
                    <h2>Track</h2>
                    <p>Log and track your workouts with ease. Monitor your progress and stay motivated with detailed workout logs.</p>
                </div>

                <div>
                    <h2>Goals</h2>
                    <p>Set your fitness goals and crush them! Whether it's weight loss, muscle gain, or endurance, we've got you covered.</p>
                </div>

                <div>
                    <h2>Progress</h2>
                    <p>Visualize your progress over time with dynamic charts and stats. Stay on track and see how far you've come.</p>
                </div>

                <div>
                    <h2>Tips</h2>
                    <p>Receive customized workout and nutrition suggestions based on your activity and goals to maximize your results.</p>
                </div>
            </div>
        </section>

    );
}