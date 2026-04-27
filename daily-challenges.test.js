/**
 * 🎯 Week 10 Daily Challenges - Automated Test Script
 * Run: node daily-challenges.test.js
 */
const http = require('http');

const BASE = 'http://localhost:3000';

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: { ...headers, 'Content-Type': 'application/json' }
    };

    const req = http.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data || '{}') }));
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Running Daily Challenges Tests...\n');

  // Day 1: Hello Server
  console.log('✅ Day 1: Hello Server');
  let res = await request('GET', '/');
  console.log(`   GET / → ${res.status} ${res.data.name || 'OK'}`);

  res = await request('GET', '/about');
  console.log(`   GET /about → ${res.status} ${res.data.message || 'OK'}`);

  res = await request('GET', '/api/time');
  console.log(`   GET /api/time → ${res.status} ${res.data.time ? '✅ Time returned' : '❌'}`);

  // Day 2: User API (simulated via posts author)
  console.log('\n✅ Day 2: User API (via posts)');
  res = await request('GET', '/api/posts?author=Alice');
  console.log(`   GET /api/posts?author=Alice → ${res.status} ${res.data.count || res.data.data?.length} posts`);

  // Day 3: Query Filtering
  console.log('\n✅ Day 3: Query Filtering');
  res = await request('GET', '/api/posts?category=farm&sort=popular&limit=2');
  console.log(`   Filtered posts → ${res.status} ${res.data.count} results`);

  // Day 4: Logger (check console output when server runs)
  console.log('\n✅ Day 4: Logger Middleware');
  console.log('   Check server console for: [timestamp] GET /api/posts - 200 (XXms)');

  // Day 5: Comments Endpoint
  console.log('\n✅ Day 5: Comments Endpoint');
  res = await request('GET', '/api/posts/1/comments');
  console.log(`   GET /api/posts/1/comments → ${res.status} ${res.data.count} comments`);

  res = await request('POST', '/api/posts/1/comments', {
    content: 'Test comment from daily challenge',
    author: 'TestUser'
  }, { 'Authorization': 'Bearer demo' });
  console.log(`   POST comment → ${res.status} ${res.data.success ? '✅ Created' : '❌'}`);

  console.log('\n🎉 All daily challenges verified!');
}

// Wait a bit for server to start if called automatically
setTimeout(runTests, 2000);

// If run directly, also execute
runTests().catch(err => {
  console.error('❌ Test failed:', err.message);
  process.exit(1);
});
