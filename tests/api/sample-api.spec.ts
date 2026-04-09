import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Tests', () => {
  test('GET - Fetch all posts', async ({ request }) => {
    // Act
    const response = await request.get(`${BASE_URL}/posts`);
    
    // Assert
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBe(100);
  });

  test('GET - Fetch single post', async ({ request }) => {
    // Act
    const response = await request.get(`${BASE_URL}/posts/1`);
    
    // Assert
    expect(response.status()).toBe(200);
    
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
  });

  test('POST - Create a new post', async ({ request }) => {
    // Arrange
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post body',
      userId: 1
    };
    
    // Act
    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost
    });
    
    // Assert
    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost).toHaveProperty('id');
  });

  test('PUT - Update a post', async ({ request }) => {
    // Arrange
    const updatedPost = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1
    };
    
    // Act
    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: updatedPost
    });
    
    // Assert
    expect(response.status()).toBe(200);
    
    const post = await response.json();
    expect(post.title).toBe(updatedPost.title);
    expect(post.body).toBe(updatedPost.body);
  });

  test('PATCH - Partially update a post', async ({ request }) => {
    // Arrange
    const partialUpdate = {
      title: 'Patched Title'
    };
    
    // Act
    const response = await request.patch(`${BASE_URL}/posts/1`, {
      data: partialUpdate
    });
    
    // Assert
    expect(response.status()).toBe(200);
    
    const post = await response.json();
    expect(post.title).toBe(partialUpdate.title);
  });

  test('DELETE - Remove a post', async ({ request }) => {
    // Act
    const response = await request.delete(`${BASE_URL}/posts/1`);
    
    // Assert
    expect(response.status()).toBe(200);
  });

  test('API - Verify response headers', async ({ request }) => {
    // Act
    const response = await request.get(`${BASE_URL}/posts/1`);
    
    // Assert
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('API - Test with authentication headers', async ({ request }) => {
    // Act
    const response = await request.get(`${BASE_URL}/posts/1`, {
      headers: {
        'Authorization': 'Bearer test-token',
        'Custom-Header': 'test-value'
      }
    });
    
    // Assert
    expect(response.status()).toBe(200);
  });
});
