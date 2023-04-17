import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList, Keyboard } from 'react-native';

import Feather from 'react-native-vector-icons/Feather'

import firebase from '../services/firebaseConnection';
import TaskList from '../TaskList';

export default function Task({ user }) {
  const [users, _setUsers] = useState(user);
  const [newTask, setnewTask] = useState('');
  const [tasksArr, settasksArr] = useState([]);
  const [key, setKey] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    const getUser = () => {
      if(!users) return;

      firebase.database().ref('tasks').child(users).once('value', (snapshot) => {
        settasksArr([]);
        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            name: childItem.val().name,
          };

          settasksArr((prev) => [...prev, data]);
        });
      });
    };

    getUser();

  }, [users]);

  const handleDelete = (key) => {
    firebase.database().ref('tasks').child(users).child(key).remove()
    .then(() => {
      const findtasks = tasksArr.filter((item) => item.key !== key);
      settasksArr(findtasks);
    });
  };
  
  const handleEdit = (data) => {
    setnewTask(data.name);
    inputRef.current.focus();
    setKey(data.key);
  };

  const cancelEdit = () => {
    setKey('');
    setnewTask('');
    Keyboard.dismiss();
  }

  const adicionarTask = () => {
    if(newTask === '') {
      return;
    }
    if (key !== '') {
      firebase.database().ref('tasks').child(users).child(key).update({
        name: newTask,
      }).then(() => {
        const index = tasksArr.findIndex( item => item.key === key);
        let taskclone = tasksArr;
        taskclone[index].name = newTask;
        settasksArr([...taskclone]);
      });
      setnewTask('');
      Keyboard.dismiss();
      setKey('');
      return;
    };
    let task = firebase.database().ref('tasks').child(users);
    let chave = task.push().key;

    task.child(chave).set({
      name: newTask,
    })
    .then(() => {
      const data = {
        key: chave,
        name: newTask,
      };

      settasksArr((prev) => [...prev, data]);
      

    })
    .catch((err) => {
      alert('Algo de errado não está certo!')
      return;
    });

    setnewTask('');
    Keyboard.dismiss();

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTask}>
      <TextInput
        style={styles.input}
        placeholder="O que você planeja para hoje?"
        value={newTask}
        ref={inputRef}
        onChangeText={ (text) =>  setnewTask(text) }
      />
      <TouchableOpacity 
        style={styles.buttonAdd}
        onPress={adicionarTask}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>

    { key.length > 0 && (
      <View style={{ flexDirection: 'row', marginBottom: 8, }}>
        <TouchableOpacity onPress={cancelEdit}>
          <Feather name="x-circle" size={20} color="#FF0000"/>
        </TouchableOpacity>
        <Text style={{ marginLeft: 5, color: '#FF0000' }}>
          Você está editando uma tarefa!
        </Text>
      </View>
    )}


    <FlatList
      style={styles.flatlist}
      data={tasksArr}
      keyExtractor={(item) => item.key}
      renderItem={ ({ item }) => (
        <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
      )}
    />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTask:{
    flexDirection: 'row',
    marginTop: 40,
  },
  input:{
    flex:1, 
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
  },
  buttonAdd:{
   backgroundColor: '#141414',
   height: 45,
   alignItems: 'center',
   justifyContent: 'center',
   marginLeft:  5,
   paddingHorizontal: 14,
   borderRadius: 4,
  },
  buttonText:{
    color: '#FFF',
    fontSize: 22,
  },
  flatlist:{
    marginTop: 10,
    width: '100%',
  }
});