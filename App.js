import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login';
import Task from './src/components/Task';


export default function App() {
  const [user, setUser] = useState(null);

  return (
    <View style={styles.container}>
      { (!user) 
        ? <Login changeStatus={ (user) => setUser(user) } /> 
        : <Task user= { user } /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
});
