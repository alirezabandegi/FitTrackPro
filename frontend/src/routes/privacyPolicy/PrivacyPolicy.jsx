import style from "./privacyPolicy.module.css" // Importing CSS module for styling

export default function PrivacyPolicy(){
    return(
        <div className={style.container}>
            <h1>Privacy Policy</h1>
            <p className={style.lastUpdateText}><strong>Last Updated:</strong> 28.8.2024</p>

            <p>Welcome to FitTrackPro. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.</p>

            <h2>1. Information We Collect</h2>
            <h3>1.1. Personal Information</h3>
            <ul>
                <li><strong>Account Information:</strong> When you sign up, we collect your name, email address, and password.</li>
            </ul>

            <h3>1.2. Usage Data</h3>
            <ul>
                <li><strong>Workout Data:</strong> When you track your workouts, we collect data such as exercise type, duration, intensity, and frequency.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Provide and maintain our services.</li>
                <li>Personalize your experience and provide tailored recommendations.</li>
                <li>Process transactions and send purchase confirmations.</li>
                <li>Communicate with you, including responding to your inquiries and sending updates.</li>
                <li>Ensure the security and integrity of our website.</li>
            </ul>

            <h2>3. Sharing Your Information</h2>
            <p>We do not share your personal information with third parties except in the following cases:</p>
            <ul>
                <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our website, conducting business, or providing services to you.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to a legal process, such as a subpoena.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.</li>
            </ul>

            <h2>4. Your Choices and Rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
                <li><strong>Deletion:</strong> You can request that we delete your personal information, subject to certain legal restrictions.</li>
            </ul>

            <h2>5. Children’s Privacy</h2>
            <p>Our website is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.</p>

            <h2>6. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last Updated” date. We encourage you to review this Privacy Policy periodically.</p>

            <h2>7. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
            <p><a href="https://www.instagram.com/alirezamaxery/" target="_blank"><strong>Instagram:</strong> @AlirezaMaxery</a></p>
        </div>
    );
}