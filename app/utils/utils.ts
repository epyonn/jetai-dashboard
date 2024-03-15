/** 
 * File Name: utils.ts
 * Purpose: Contains utility functions for interacting with the OpenAI API to generate comparison prompts based on selected jets and their criteria. 
 * Created Date: 2024-03-14
 */
import { Jet } from '@/app/types/types';
import axios from 'axios';

// function to construct a prompt for the OpenAI API
export const constructPrompt = (comparison: string, checkedJets: Jet[]): string => {
  let promptBase = `Provide a comparison of the following jets in terms of their ${comparison}:`;
  const jetsList = checkedJets.map(jet => jet.name).join(", ");
  const finalPrompt = `${promptBase} ${jetsList}. Provide the data in JSON format named jets, with each entry including 'rank', 'name', and 'value' as keys. Keep the ouput for value short. The jet with the highest values should be ranked higher.`;
  return finalPrompt;
};

export const handleSubmit = async (comparison: string, checkedJets: Jet[], setResponse: (response: any) => void) => {
  if (checkedJets.length <= 1) {
    alert("Please select more than one jet for comparison.");
    return;
  }
  try {
    const dynamicPrompt = constructPrompt(comparison, checkedJets);
    const response = await axios.post('/api/openai', {
      model: 'text-davinci-003',
      prompt: dynamicPrompt,
      max_tokens: 60,
    });
    const cleanJsonString = response.data.choices[0].message.content.replace(/```json|```/g, '');
    const jsonData = JSON.parse(cleanJsonString);
    setResponse(jsonData.jets);
  } catch (error) {
    console.error("Error fetching the comparison:", error);
  }
};

