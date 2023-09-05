import axios from 'axios';

export const login = async (username: string, password: string): Promise<string> => {
  try {
    // Make an API request to authenticate the user
    const response = await axios.post('/api/auth', { username, password }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Assuming the API response contains a token
    console.log(response);

    const { token } = response.data;

    // Store the token in local storage or state management
    localStorage.setItem('token', token);

    return token;
  } catch (error) {
    console.log(error);
    throw new Error('Authentication failed. Please check your credentials.');
  }
};

// Function to log out the user
export const logout = (): void => {
  // Remove the token from local storage or state management
  localStorage.removeItem('token');
};
