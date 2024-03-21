import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import colors from '../redux/constants/colors';
const Sos = () => {
  const decisionTree = {
    question: 'Welcome! What service can I help you with?', // More welcoming greeting
    answers: [
      {response: 'About Raksha', next: 'about'},
      {response: 'Report Cyber Fraud', next: 'victim'},
    ],
    about: {
      question: `Introduction to Raksha: Your Cybersecurity Guardian

Raksha is your ultimate cybersecurity companion in the digital world. We offer tools and knowledge to navigate online securely.

**How Raksha Protects You:**

- Monitors SMS, URL, call, and UPI address fraud.
- Educates users through stories, blogs, and gamification.
- Provides legal information on Indian cyber laws.
- Offers AI-generated stories in Hindi for broader reach.
- Educates children about cybersecurity with storybooks.
- Friendly chatbot assists with fraud prevention and reporting.

With Raksha, you can navigate the digital world with confidence. Join us for a safer online experience!`,
      answers: [''], // No further questions for "About Raksha"
    },
    victim: {
      question: 'What type of cyber fraud were you a victim of?',
      answers: [
        {response: 'OTP Fraud', next: 'otp'},
        {response: 'Remote Access App Fraud', next: 'remote'},
        {response: 'UPI Fraud', next: 'upi'},
        {response: 'Refund Fraud', next: 'refund'},
        {response: 'Fake SMS Fraud', next: 'sms'},
        {response: 'QR Code Scam', next: 'qr'},
        {response: 'Google Business Site Scam', next: 'google'},
      ],
    },
    otp: {
      question: `Steps to File a Complaint Against OTP Fraud:

1. Visit the Cybercrime Portal: https://cybercrime.gov.in
2. Click "Report Cyber Crime"
3. Accept Terms and Conditions
4. Register as a New User
5. Verify your Mobile Number
6. Fill in Personal Details
7. Enter Key Details of the Incident
8. Select "Online Fraud" as the Incident Category
9. Choose "OTP Fraud" as the Subcategory
10. Specify the Amount Lost (if applicable)
11. Provide Transaction Details (if applicable)
12. Fill in Suspect Details (if known)
13. Enter Your Complainant Details
14. Save and Preview the Complaint
15. Review and Submit the Complaint
16. Download a PDF copy of your Complaint
17. You will receive an Acknowledgement with a reference number
18. Track the Status of your Complaint using the reference number

**Additional Resources:**

- Report Cyber Fraud Online: https://cybercrime.gov.in
- National Cyber Security Alliance (NCSA): https://staysafeonline.org

We understand that reporting fraud can be stressful. If you need further assistance, please contact Raksha for help.`,
      answers: [''], // No further questions for "OTP Fraud"
    },
    remote: {
      question: `Steps to raise Complaint : -
      1. Contact Financial Institution - Inform payment provider
      2. File FTC Complaint - Report scam to FTC
      3. Recover Funds - Dispute credit card charges
      4. Clean Computer - Wipe or restore system
      5. Use Malware Cleaner - Run reputable antivirus
      6. Reset Passwords - Secure accounts
      7. Install Ad Blocker - Prevent scam pop-ups`,
      answers: [''], // No further questions for "OTP Fraud"
    },
    upi: {
      question: `1. UPI Fraud Reporting:
      - Inform UPI service provider
      - Flag transaction, request refund
      - File complaint on NPCI portal
     
     2. Banking Frauds Reporting:
      - Report to bank immediately
      - Notify insurance company
      - File complaint on Cybercrime portal if necessary
     
     3. Prevention Measures:
      - Guard personal information
      - Beware of suspicious links
      - Use strong passwords
      - Enable two-factor authentication`,
      answers: [''], // No further questions for "OTP Fraud"
    },
    refund: {
      question: `1. Learn Return Policies
      2. Check Deadlines
      3. Collect Documents
      4. Explain the Problem
      5. Be Clear about Solution
      6. Ask for Manager
      7. Keep Notes
      8. Write Complaint Letter
      9. Get Outside Help
      10. Post Online Review
      11. Consider Dispute Resolution
      12. Small Claims Courts
      13. Last Resort: Lawsuit`,
      answers: [''], // No further questions for "OTP Fraud"
    },
    sms: {
      question: `1. Report to TSP
      - Complain or report
     2. Timeframe Difference
      - Complaint vs Report
     3. Complaint Details
      - Required Information
     4. Tracking Complaint
      - Complaint ID provided
     5. Registration Modes
      - Methods to register
     6. Reporting UCC/Spam
      - Quick information sharing
     7. COP-Complaint
      - Code of Practice
     8. TSP Links
      - COP-Complaint links
     9. Header Information Portal
      - Sender identification`,
      answers: [''], // No further questions for "OTP Fraud"
    },
    qr: {
      question: `1. Beware QR Scams
      2. Verify QR Codes
      3. Be cautious Online
      4. Avoid Scanning QR
      5. Call Bank ASAP`,
      answers: [''], // No further questions for "OTP Fraud"
    },
    google: {
      question: `1. Read Recommended Answer
      2. Check Google Support
      3. Report Scam Sites
      4. Locate Report Button
      5. Complete Abuse Report
      6. Submit Report`,
      answers: [''], // No further questions for "OTP Fraud"
    },
    // Define other questions and answers for other fraud types (remote, upi, etc.)
  };

  const [currentQuestion, setCurrentQuestion] = useState('question');
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setHistory(prevHistory => [
      ...prevHistory,
      {question: decisionTree.question},
    ]);
  }, []);
  const handleResponse = response => {
    // Update history
    if (response === 'thank YOU') {
      setHistory([]);
      setHistory(prevHistory => [
        ...prevHistory,
        {question: decisionTree.question},
      ]);
      setCurrentQuestion('question');
    } else {
      console.log(response);
      setHistory(prevHistory => [
        ...prevHistory,
        {question: decisionTree[currentQuestion].question, response},
      ]);

      // Find the next question or action
      if (currentQuestion === 'question') {
        const next = decisionTree?.answers.find(
          answer => answer.response === response,
        )?.next;
        console.log(next);
        if (next) {
          setCurrentQuestion(next);
        } else {
          // Handle end of tree logic (e.g., display final message or reset)
          handleEndOfTree();
        }
      } else {
        const next = decisionTree[currentQuestion]?.answers.find(
          answer => answer.response === response,
        )?.next;
        console.log('next quenjsn', next);
        if (next) {
          setCurrentQuestion(next);
        } else {
          // Handle end of tree logic (e.g., display final message or reset)
          handleEndOfTree();
        }
      }
    }
  };
  const handleEndOfTree = () => {
    // Implement logic for what happens when the end of the decision tree is reached (e.g., final message, reset button)
    console.log('End of Decision Tree Reached!');
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {history.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.questionText}>{item.question}</Text>
            {item.response && (
              <Text style={styles.responseText}>{item.response}</Text>
            )}
          </View>
        ))}
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 100,padding:20}}>
          {currentQuestion === 'question' && (
            <Text style={styles.questionText}>
              {decisionTree[currentQuestion]?.question}
            </Text>
          )}
          {currentQuestion !== 'question' && (
            <Text style={styles.questionText}>
              {console.log(decisionTree)}
              {decisionTree[currentQuestion]?.question}
            </Text>
          )}
          <View>
            {currentQuestion === 'question' && // Only render buttons for subsequent questions
              decisionTree.answers.map((answer, index) => (
                <Button
                  key={index}
                  title={answer.response}
                  onPress={() => handleResponse(answer.response)}
                />
              ))}
            {currentQuestion !== 'question' && // Only render buttons for subsequent questions
              decisionTree[currentQuestion]?.answers.map((answer, index) => (
                <Button
                  key={index}
                  title={`${answer.response ? answer.response : 'thank YOU'}`}
                  onPress={() =>
                    handleResponse(
                      `${answer.response ? answer.response : 'thank YOU'}`,
                    )
                  }
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems:"center",
    backgroundColor: colors.screenbg,
  },
  text: {
    fontSize: 100,
    fontStyle: 'italic',
  },
  questionText: {
    color: colors.white,
    fontSize: 15,
    marginBottom: 10,

  },
  responseText: {
    color: colors.white,
    
    padding:10,
    borderRadius:10,
    backgroundColor:colors.buttonbg,
    fontSize: 16,
  },
  historyItem: {
    // borderBottomWidth: 1,
    // borderColor: colors.white,
    // paddingBottom: 10,
    padding:10,
    // marginBottom: 10,
  },
});
export default Sos;
