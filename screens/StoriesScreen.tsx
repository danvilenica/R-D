import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';

type StoriesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Stories'>;

type Props = {
  navigation: StoriesScreenNavigationProp;
};

interface Story {
  id: string;
  title: string;
  likes: number;
}

const mockStories: Story[] = [
  { id: '1', title: "The Curious Explorer's Adventure", likes: 150 },
  { id: '2', title: "Lily's Magical Garden", likes: 120 },
  { id: '3', title: "The Friendly Robot's First Day", likes: 100 },
];

const StoriesScreen: React.FC<Props> = ({ navigation }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const [characters, setCharacters] = useState<string[]>(['']);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setShowForm(false);
      // Handle the generated story here
    }, 3000);
  };

  const addCharacter = () => {
    if (characters.length < 5) {
      setCharacters([...characters, '']);
    }
  };

  const updateCharacter = (index: number, value: string) => {
    const newCharacters = [...characters];
    newCharacters[index] = value;
    setCharacters(newCharacters);
  };

  const removeCharacter = (index: number) => {
    const newCharacters = characters.filter((_, i) => i !== index);
    setCharacters(newCharacters);
  };

  const renderStoryItem = ({ item }: { item: Story }) => (
    <View style={styles.storyCard}>
      <Text style={styles.storyTitle}>{item.title}</Text>
      <View style={styles.storyFooter}>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart-outline" size={20} color="#FF5722" />
          <Text style={styles.likeCount}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.readButton}>
          <Text style={styles.readButtonText}>Read Story</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/OIP.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Magical Stories</Text>

        {!showForm ? (
          <>
            <TouchableOpacity
              style={styles.generateButton}
              onPress={() => setShowForm(true)}
            >
              <Text style={styles.generateButtonText}>Create New Story</Text>
            </TouchableOpacity>

            <FlatList
              data={mockStories.sort((a, b) => b.likes - a.likes)}
              renderItem={renderStoryItem}
              keyExtractor={item => item.id}
              style={styles.storyList}
            />
          </>
        ) : (
          <ScrollView style={styles.formContainer}>
            <Text style={styles.formLabel}>Age Group</Text>
            <TextInput
              style={styles.input}
              onChangeText={setAgeGroup}
              value={ageGroup}
              placeholder="Enter age (3-12)"
              keyboardType="numeric"
            />

            <Text style={styles.formLabel}>Story Theme</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTheme}
              value={theme}
              placeholder="Enter story theme"
            />

            <Text style={styles.formLabel}>Characters (Max 5)</Text>
            {characters.map((character, index) => (
              <View key={index} style={styles.characterInput}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => updateCharacter(index, value)}
                  value={character}
                  placeholder={`Character ${index + 1} name`}
                />
                {index > 0 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeCharacter(index)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            {characters.length < 5 && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={addCharacter}
              >
                <Text style={styles.addButtonText}>Add Character</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerate}
              disabled={isGenerating}
            >
              <Text style={styles.generateButtonText}>
                {isGenerating ? 'Creating Story...' : 'Create Story'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 5,
    color: '#4A90E2',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  storyList: {
    flex: 1,
  },
  storyCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  storyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
    color: '#FF5722',
  },
  readButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 20,
  },
  readButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  characterInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#FF5722',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default StoriesScreen;