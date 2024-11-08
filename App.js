import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.0.103:5000/submit', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, birthDate, cpf, maritalStatus }),
      });
  
      const result = await response.json();
      Alert.alert('Success', `Response from server: ${result.message}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit data');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={birthDate}
        onChangeText={setBirthDate}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Estado Civil</Text>
      <Picker
        selectedValue={maritalStatus}
        onValueChange={(itemValue) => setMaritalStatus(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione..." value="" />
        <Picker.Item label="Solteiro(a)" value="Solteiro(a)" />
        <Picker.Item label="Casado(a)" value="Casado(a)" />
        <Picker.Item label="Divorciado(a)" value="Divorciado(a)" />
        <Picker.Item label="Viúvo(a)" value="Viúvo(a)" />
      </Picker>
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
});
