import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Sarabun', 'Inter', sans-serif;
    background-color: #f4f7f9;
    color: #333;
    line-height: 1.6;
  }
  * {
    box-sizing: border-box;
  }
`;

// --- Styled Components ---
// (เหมือนเดิมส่วนใหญ่)

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
`;

const FormTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  font-size: 1.8em;
  font-weight: 600;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledFieldset = styled.fieldset`
  border: 1px solid #dce4e8;
  border-radius: 8px;
  padding: 20px 25px;
  background-color: #fdfdfd;
`;

const Legend = styled.legend`
  font-weight: 600;
  font-size: 1.15em;
  padding: 0 10px;
  margin-left: 5px;
  color: #34495e;
`;

const InputGroup = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 0.95em;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1em;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
  }
`;

const Textarea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 80px;
`;

const RadioGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
`;

// --- Custom Radio Button Styling ---
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    background-color: #ecf0f1;
  }
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
`;

const StyledRadio = styled.span`
  width: 18px;
  height: 18px;
  border: 2px solid #bdc3c7;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  transition: border-color 0.2s ease;

  ${HiddenRadio}:checked + & {
    border-color: #3498db;
  }

  &::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: #3498db;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.2s ease;
  }

  ${HiddenRadio}:checked + &::after {
    transform: translate(-50%, -50%) scale(1);
  }

   ${HiddenRadio}:focus + & {
     box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
   }
`;
// --- End Custom Radio Button ---

const SusQuestionContainer = styled.div`
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ecf0f1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const QuestionText = styled.p`
  font-weight: 500;
  margin-bottom: 15px;
  color: #34495e;
  font-size: 1.05em;
`;

const SusRatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
  gap: 10px;
`;

const RatingScaleLabel = styled.span`
  font-size: 0.9em;
  color: #7f8c8d;
  text-align: center;
  flex-basis: 100px;
  flex-grow: 1;
`;

const SusRadioLabel = styled(RadioLabel)`
    flex-direction: column;
    align-items: center;
    padding: 10px 5px;
    min-width: 50px;
    text-align: center;

    ${StyledRadio} {
      margin-right: 0;
      margin-bottom: 5px;
    }

    &:hover {
      background-color: #f8f9f9;
    }

    ${HiddenRadio}:checked + ${StyledRadio} + span {
       font-weight: 600;
       color: #2980b9;
    }
`;

const RatingValue = styled.span`
  font-size: 0.95em;
  margin-top: 3px;
`;

const SubmitButton = styled.button`
  padding: 12px 30px;
  font-size: 1.1em;
  font-weight: 600;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  display: block;
  margin: 20px auto 0;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
      transform: scale(0.98);
  }

  &:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
  }
`;

// --- Language Switcher Styled Components ---
const LanguageSwitcher = styled.div`
  display: flex;
  justify-content: flex-end; /* จัดไปทางขวา */
  margin-bottom: 20px; /* ระยะห่างจาก Title */
  gap: 10px; /* ระยะห่างระหว่างปุ่ม */
`;

const LangButton = styled.button`
  padding: 5px 12px;
  font-size: 0.9em;
  font-weight: 500;
  border: 1px solid ${props => props.active ? '#3498db' : '#ccc'}; /* เปลี่ยนสีขอบ */
  border-radius: 6px;
  background-color: ${props => props.active ? '#eaf5fd' : '#f8f9f9'}; /* เปลี่ยนสีพื้นหลัง */
  color: ${props => props.active ? '#2980b9' : '#555'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? '#eaf5fd' : '#ecf0f1'};
    border-color: #3498db;
  }
`;

// --- Translations Object ---
const translations = {
    th: {
        formTitle: 'แบบประเมินการใช้งานระบบ TraceCraft',
        evaluatorInfoLegend: 'ข้อมูลผู้ประเมิน',
        nameLabel: 'ชื่อ-นามสกุล:',
        positionLabel: 'ตำแหน่ง:',
        jobDescriptionLabel: 'ลักษณะงานโดยย่อ:',
        isoFamiliarityLegend: 'ความคุ้นเคยกับ ISO/IEC 29110',
        isoFamiliarityQuestion: 'ท่านรู้จักมาตรฐาน ISO/IEC 29110 ดีแค่ไหน?',
        isoLevel1: '1 - ไม่รู้จักเลย',
        isoLevel2: '2 - เคยได้ยินชื่อ',
        isoLevel3: '3 - พอเข้าใจบ้าง',
        isoLevel4: '4 - เข้าใจดี',
        isoLevel5: '5 - เชี่ยวชาญ',
        susEvaluationLegend: 'แบบประเมินการใช้งาน (SUS)',
        susInstruction: 'สำหรับแต่ละข้อความต่อไปนี้ โปรดเลือกระดับคะแนนที่ตรงกับความคิดเห็นของท่านมากที่สุด',
        stronglyDisagree: 'ไม่เห็นด้วยอย่างยิ่ง',
        stronglyAgree: 'เห็นด้วยอย่างยิ่ง',
        susQuestion1: '1. ฉันคิดว่าฉันอยากจะใช้ระบบนี้บ่อยครั้ง',
        susQuestion2: '2. ฉันพบว่าระบบนี้ซับซ้อนเกินความจำเป็น',
        susQuestion3: '3. ฉันคิดว่าระบบนี้ใช้งานง่าย',
        susQuestion4: '4. ฉันคิดว่าฉันต้องการการสนับสนุนจากบุคคลทางเทคนิคเพื่อที่จะสามารถใช้ระบบนี้ได้',
        susQuestion5: '5. ฉันพบว่าฟังก์ชันต่างๆ ในระบบนี้ทำงานร่วมกันได้เป็นอย่างดี',
        susQuestion6: '6. ฉันคิดว่าระบบนี้มีความไม่สอดคล้องกันมากเกินไป',
        susQuestion7: '7. ฉันคิดว่าคนส่วนใหญ่จะเรียนรู้การใช้ระบบนี้ได้อย่างรวดเร็วมาก',
        susQuestion8: '8. ฉันพบว่าระบบนี้ใช้งานได้ยุ่งยาก/อุ้ยอ้ายมาก',
        susQuestion9: '9. ฉันรู้สึกมั่นใจมากในการใช้ระบบนี้',
        susQuestion10: '10. ฉันจำเป็นต้องเรียนรู้อะไรหลายอย่างก่อนที่ฉันจะสามารถเริ่มต้นใช้งานระบบนี้ได้',
        suggestionsLegend: 'ข้อเสนอแนะเพิ่มเติม',
        suggestionsLabel: 'ข้อเสนอแนะอื่นๆ (ถ้ามี):',
        submitButton: 'ส่งแบบประเมิน',
        submitSuccessMessage: 'ส่งข้อมูลเรียบร้อย!',
    },
    en: {
        formTitle: 'TraceCraft System Usage Evaluation Form',
        evaluatorInfoLegend: 'Evaluator Information',
        nameLabel: 'Name:',
        positionLabel: 'Position:',
        jobDescriptionLabel: 'Brief Job Description:',
        isoFamiliarityLegend: 'Familiarity with ISO/IEC 29110',
        isoFamiliarityQuestion: 'How familiar are you with the ISO/IEC 29110 standard?',
        isoLevel1: '1 - Not familiar at all',
        isoLevel2: '2 - Heard of it',
        isoLevel3: '3 - Somewhat familiar',
        isoLevel4: '4 - Familiar',
        isoLevel5: '5 - Expert',
        susEvaluationLegend: 'System Usability Scale (SUS)',
        susInstruction: 'For each statement, please select the score that best reflects your opinion.',
        stronglyDisagree: 'Strongly Disagree',
        stronglyAgree: 'Strongly Agree',
        susQuestion1: '1. I think that I would like to use this system frequently.',
        susQuestion2: '2. I found the system unnecessarily complex.',
        susQuestion3: '3. I thought the system was easy to use.',
        susQuestion4: '4. I think that I would need the support of a technical person to be able to use this system.',
        susQuestion5: '5. I found the various functions in this system were well integrated.',
        susQuestion6: '6. I thought there was too much inconsistency in this system.',
        susQuestion7: '7. I would imagine that most people would learn to use this system very quickly.',
        susQuestion8: '8. I found the system very cumbersome/awkward to use.',
        susQuestion9: '9. I felt very confident using the system.',
        susQuestion10: '10. I needed to learn a lot of things before I could get going with this system.',
        suggestionsLegend: 'Additional Suggestions',
        suggestionsLabel: 'Other suggestions (if any):',
        submitButton: 'Submit Evaluation',
        submitSuccessMessage: 'Submission successful!',
    }
};

// --- Component ย่อยสำหรับ SUS Question (ปรับให้รับ text จาก props) ---
const SusQuestion = ({ questionText, questionKey, value, onChange, langData }) => { // เพิ่ม langData
    const ratings = [1, 2, 3, 4, 5];

    return (
        <SusQuestionContainer>
            <QuestionText>{questionText}</QuestionText>
            <SusRatingContainer>
                <RatingScaleLabel>{langData.stronglyDisagree}</RatingScaleLabel> {/* ใช้ text จาก langData */}
                {ratings.map((rating) => (
                    <SusRadioLabel key={rating}>
                        <HiddenRadio
                            type="radio"
                            name={questionKey}
                            value={rating}
                            checked={value === rating}
                            onChange={onChange}
                            required
                        />
                        <StyledRadio />
                        <RatingValue>{rating}</RatingValue>
                    </SusRadioLabel>
                ))}
                <RatingScaleLabel>{langData.stronglyAgree}</RatingScaleLabel> {/* ใช้ text จาก langData */}
            </SusRatingContainer>
        </SusQuestionContainer>
    );
};

// --- กำหนด State เริ่มต้นสำหรับ Reset ฟอร์ม ---
const initialFormData = {
    name: '',
    position: '',
    jobDescription: '',
    isoFamiliarity: '',
    susAnswers: {
        sus1: null, sus2: null, sus3: null, sus4: null, sus5: null,
        sus6: null, sus7: null, sus8: null, sus9: null, sus10: null,
    },
    suggestions: '',
};
const FormEvaluate = () => {
    const [language, setLanguage] = useState('th');
    const [formData, setFormData] = useState(initialFormData); // ใช้ state เริ่มต้น
    const [isSubmitting, setIsSubmitting] = useState(false); // State สำหรับสถานะกำลังส่ง
    const [submitError] = useState(null); // State สำหรับเก็บข้อผิดพลาด
    const [submitSuccess] = useState(false); // State สำหรับแสดงผลสำเร็จ

    // ดึงข้อความตามภาษาที่เลือก
    const t = translations[language];

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSusChange = (e) => {
        const { name, value } = e.target;
        // ตรวจสอบว่าเป็นค่าตัวเลข 1-5 ก่อน parseInt
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue) && intValue >= 1 && intValue <= 5) {
            setFormData((prevData) => ({
                ...prevData,
                susAnswers: { ...prevData.susAnswers, [name]: intValue },
            }));
        }
    };

    const handleIsoFamiliarityChange = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({ ...prevData, isoFamiliarity: value }));
    };

    // --- Updated handleSubmit Function ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log('Form Data to be sent:', formData);

        // --- การตรวจสอบข้อมูลก่อนส่ง ---
        const { name, position, isoFamiliarity, susAnswers } = formData;
        if (!name || !position || !isoFamiliarity) {
            // เพิ่ม Emoji ⚠️ สำหรับ Validation Error
            toast.error(`⚠️ ${t.validationErrorMessage}`);
            setIsSubmitting(false);
            return;
        }

        const allSusAnswered = Object.values(susAnswers).every(answer => answer !== null);
        if (!allSusAnswered) {
            // เพิ่ม Emoji ⚠️ สำหรับ Validation Error (SUS ไม่ครบ)
            toast.error(`⚠️ ${t.susIncompleteMessage}`);
            setIsSubmitting(false);
            return;
        }
        // --- สิ้นสุดการตรวจสอบ ---

        try {
            const response = await fetch('http://localhost:3001/api/evaluations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success response from server:', result);
                // เพิ่ม Emoji ✨ หรือ 🎉 สำหรับ Success
                toast.success(`✨ ${t.submitSuccessMessage}`);
                setFormData(initialFormData); // Reset ฟอร์ม
            } else {
                const errorData = await response.json().catch(() => ({ message: response.statusText || 'Unknown server error' }));
                console.error('Submission failed:', response.status, errorData);
                // เพิ่ม Emoji ❌ หรือ 😥 สำหรับ Error ทั่วไปจาก Server
                toast.error(`❌ ${t.submitFailMessage} ${response.status} - ${errorData?.message || ''}`);
            }
        } catch (error) {
            console.error('Network or fetch error:', error);
            // เพิ่ม Emoji 😥 หรือ 🌐 สำหรับ Network Error
            toast.error(`😥 ${t.networkErrorMessage} ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    // (ส่วนที่เหลือของ Component เหมือนเดิม...)
    const susQuestionKeys = Object.keys(formData.susAnswers);
    const isoFamiliarityLevels = [
        { value: '1', labelKey: 'isoLevel1' },
        { value: '2', labelKey: 'isoLevel2' },
        { value: '3', labelKey: 'isoLevel3' },
        { value: '4', labelKey: 'isoLevel4' },
        { value: '5', labelKey: 'isoLevel5' },
    ];

    return (
        <>
            <GlobalStyle />
            <Navbar />
            <ToastContainer
                position="top-right" // ตำแหน่งแสดงผล
                autoClose={3000}     // ปิดอัตโนมัติใน 3 วินาที
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" // หรือ "light", "dark"
            />
            <FormWrapper>
                {/* --- Language Switcher --- */}
                <LanguageSwitcher>
                    {/* ... LangButtons ... */}
                    <LangButton onClick={() => changeLanguage('th')} active={language === 'th'}>
                        TH
                    </LangButton>
                    <LangButton onClick={() => changeLanguage('en')} active={language === 'en'}>
                        EN
                    </LangButton>
                </LanguageSwitcher>

                <FormTitle>{t.formTitle}</FormTitle>
                {/* แสดงข้อความ Error หากมี */}
                {submitError && <p style={{ color: 'red', textAlign: 'center' }}>{submitError}</p>}
                {/* แสดงข้อความ Success หากมี */}
                {submitSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{t.submitSuccessMessage}</p>}


                <StyledForm onSubmit={handleSubmit}>
                    {/* --- ข้อมูลผู้ประเมิน --- */}
                    <StyledFieldset disabled={isSubmitting}> {/* Disable fieldset ขณะ submitting */}
                        {/* ... Input fields for name, position, jobDescription ... */}
                        <Legend>{t.evaluatorInfoLegend}</Legend>
                        <InputGroup>
                            <Label htmlFor="name">{t.nameLabel}</Label>
                            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="position">{t.positionLabel}</Label>
                            <Input type="text" id="position" name="position" value={formData.position} onChange={handleChange} required disabled={isSubmitting} />
                        </InputGroup>
                        <InputGroup style={{ marginBottom: 0 }}>
                            <Label htmlFor="jobDescription">{t.jobDescriptionLabel}</Label>
                            <Textarea id="jobDescription" name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="3" disabled={isSubmitting} />
                        </InputGroup>

                    </StyledFieldset>

                    {/* --- ความคุ้นเคย ISO 29110 --- */}
                    <StyledFieldset disabled={isSubmitting}>
                        {/* ... Radio buttons for isoFamiliarity ... */}
                        <Legend>{t.isoFamiliarityLegend}</Legend>
                        <p style={{ marginBottom: '15px', marginTop: '5px', fontSize: '0.95em', color: '#666' }}>
                            {t.isoFamiliarityQuestion}
                        </p>
                        <RadioGroupContainer>
                            {isoFamiliarityLevels.map(level => (
                                <RadioLabel key={level.value}>
                                    <HiddenRadio
                                        name="isoFamiliarity"
                                        value={level.value}
                                        checked={formData.isoFamiliarity === level.value}
                                        onChange={handleIsoFamiliarityChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <StyledRadio />
                                    {t[level.labelKey]}
                                </RadioLabel>
                            ))}
                        </RadioGroupContainer>
                    </StyledFieldset>

                    {/* --- แบบประเมิน SUS --- */}
                    <StyledFieldset disabled={isSubmitting}>
                        {/* ... SusQuestion components ... */}
                        <Legend>{t.susEvaluationLegend}</Legend>
                        <p style={{ marginBottom: '25px', marginTop: '5px', fontStyle: 'italic', color: '#666', fontSize: '0.95em' }}>
                            {t.susInstruction}
                        </p>
                        {susQuestionKeys.map((qKey, index) => {
                            const translationKey = `susQuestion${index + 1}`;
                            return (
                                <SusQuestion
                                    key={qKey}
                                    questionText={t[translationKey]}
                                    questionKey={qKey}
                                    value={formData.susAnswers[qKey]}
                                    onChange={handleSusChange} // ใช้ handleSusChange ที่ validate แล้ว
                                    langData={t}
                                // ส่ง isSubmitting ไป disable radio ใน SusQuestion ถ้าต้องการ (ต้องแก้ SusQuestion component ด้วย)
                                />
                            );
                        })}
                    </StyledFieldset>

                    {/* --- ข้อเสนอแนะ --- */}
                    <StyledFieldset disabled={isSubmitting}>
                        {/* ... Textarea for suggestions ... */}
                        <Legend>{t.suggestionsLegend}</Legend>
                        <InputGroup style={{ marginBottom: 0 }}>
                            <Label htmlFor="suggestions">{t.suggestionsLabel}</Label>
                            <Textarea id="suggestions" name="suggestions" value={formData.suggestions} onChange={handleChange} rows="4" disabled={isSubmitting} />
                        </InputGroup>
                    </StyledFieldset>

                    {/* --- ปุ่มส่ง --- */}
                    {/* Disable ปุ่ม และเปลี่ยนข้อความขณะกำลังส่ง */}
                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? t.submitButtonSubmitting : t.submitButton}
                    </SubmitButton>
                </StyledForm>
            </FormWrapper>
        </>
    );
};

export default FormEvaluate;