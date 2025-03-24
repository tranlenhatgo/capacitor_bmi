// Install dependencies first:
// npm install @capacitor/core @capacitor/cli @capacitor/android react react-dom
// npx cap init bmi-calculator com.example.bmicalculator

import { useState } from 'react';
import { Share } from '@capacitor/share';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Camera, CameraResultType } from '@capacitor/camera';
import './App.css';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const calculateBMI = async () => {
    if (!weight || !height || isNaN(weight) || isNaN(height)) {
      alert('Vui lòng nhập chiều cao và cân nặng hợp lệ');
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = (
      parseFloat(weight) /
      (heightInMeters * heightInMeters)
    ).toFixed(2);
    setBmi(bmiValue);

    let result = '';
    if (bmiValue < 18.5) result = 'Gầy';
    else if (bmiValue >= 18.5 && bmiValue < 24.9) result = 'Bình thường';
    else if (bmiValue >= 25 && bmiValue < 29.9) result = 'Thừa cân';
    else result = 'Béo phì';

    setStatus(result);

    // Trigger a local notification
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Kết quả BMI',
            body: `Chỉ số BMI của bạn: ${bmiValue} - ${result}`,
            id: Date.now(),
          },
        ],
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const shareBMI = async () => {
    if (!bmi) return alert('Hãy tính BMI trước khi chia sẻ');
    setShowPersonalInfo(true);

    if (name && age) {
      await Share.share({
        title: 'Kết quả BMI',
        text: `Tôi là ${name}, ${age} tuổi. Chỉ số BMI của tôi là ${bmi} - ${status}`,
        // url: photo,
        dialogTitle: 'Chia sẻ kết quả BMI',
      });
    }
  };

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri
      });
      setPhoto(image.webPath);
    } catch (error) {
      alert('Không thể chụp ảnh');
    }
  };

  return (
    <div
      className="App"
      style={{
        textAlign: 'center',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>📊 Tính BMI</h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <input
          type="number"
          placeholder="Nhập cân nặng (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            width: '80%',
            maxWidth: '400px',
          }}
        />

        <input
          type="number"
          placeholder="Nhập chiều cao (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            width: '80%',
            maxWidth: '400px',
          }}
        />

        <button
          onClick={calculateBMI}
          style={{
            padding: '15px 30px',
            borderRadius: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ✅ Tính BMI
        </button>

        {bmi && (
          <div
            style={{
              marginTop: '20px',
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: '#ecf0f1',
              width: '80%',
              maxWidth: '400px',
            }}
          >
            <h2>Chỉ số BMI: {bmi}</h2>
            <p>Kết luận: {status}</p>
          </div>
        )}

        <button
          onClick={shareBMI}
          style={{
            padding: '15px 30px',
            borderRadius: '10px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          📤 Chia sẻ kết quả
        </button>

        {showPersonalInfo && (
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />

            <input
              type="number"
              placeholder="Nhập tuổi của bạn"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        )}

        <button
          onClick={takePhoto}
          style={{
            padding: '15px 30px',
            borderRadius: '10px',
            backgroundColor: '#e67e22',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          📸 Chụp ảnh
        </button>

        {photo && (
          <img
            src={photo}
            alt="Ảnh của bạn"
            style={{ maxWidth: '80%', marginTop: '20px', borderRadius: '10px' }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
