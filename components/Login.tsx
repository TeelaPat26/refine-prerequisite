import { useState } from 'react'
import { Input, Button, Card, Typography, Space, Layout } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useLogin } from '@refinedev/core'

export const LoginPage = () => {
  const { mutateAsync: loginAsync } = useLogin()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Handle login logic here
      console.log('Form submitted:', { username, password })
      await loginAsync({ username, password })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card style={{ width: '100%', maxWidth: 400 }}>
        <Typography.Title
          level={2}
          style={{ textAlign: 'center', marginBottom: 24 }}
        >
          Login
        </Typography.Title>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <div>
            <Typography.Text>Email</Typography.Text>
            <Input
              value={username}
              onChange={e => setUsername(e.target.value)}
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Enter your email"
              size="large"
            />
          </div>

          <div>
            <Typography.Text>Password</Typography.Text>
            <Input.Password
              value={password}
              onChange={e => setPassword(e.target.value)}
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Enter your password"
              size="large"
            />
          </div>

          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </Space>
      </Card>
    </Layout>
  )
}

export default LoginPage
