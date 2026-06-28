import { useState } from 'react'

const APP_PASSWORD = 'inbox2024'

export default function Login({ onLogin }) {
  const [pass,    setPass]    = useState('')
  const [error,   setError]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [show,    setShow]    = useState(false)

  const handleSubmit = () => {
    if (!pass.trim()) return
    setLoading(true)
    setTimeout(() => {
      if (pass === APP_PASSWORD) {
        sessionStorage.setItem('wa_auth', '1')
        onLogin()
      } else {
        setError(true)
        setLoading(false)
        setPass('')
        setTimeout(() => setError(false), 2500)
      }
    }, 600)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        body { background: #080d14; font-family: 'Outfit', sans-serif; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes shake  { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes spin   { to { transform: rotate(360deg) } }
      `}</style>
      <div style={{ height:'100vh', background:'#080d14', display:'flex', alignItems:'center', justifyContent:'center', padding:20, backgroundImage:'radial-gradient(ellipse at 50% 40%, rgba(37,211,102,0.06) 0%, transparent 65%)' }}>
        <div style={{ width:'100%', maxWidth:380, animation:'fadeUp .5s ease' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <div style={{ width:72, height:72, background:'linear-gradient(135deg,#25d366,#128c7e)', borderRadius:22, display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:36, boxShadow:'0 8px 32px rgba(37,211,102,0.3)', marginBottom:18 }}>💬</div>
            <h1 style={{ color:'#f1f5f9', fontSize:24, fontWeight:800, letterSpacing:'-0.02em', marginBottom:6 }}>WA Inbox</h1>
            <p style={{ color:'#475569', fontSize:14 }}>Ingresa la contraseña para continuar</p>
          </div>
          <div style={{ background:'#0d1420', border:`1px solid ${error ? 'rgba(239,68,68,.4)' : '#1e2d3d'}`, borderRadius:20, padding:28, boxShadow:'0 24px 64px rgba(0,0,0,.5)', animation: error ? 'shake .4s ease' : 'none' }}>
            <label style={{ fontSize:11, color:'#64748b', fontWeight:700, letterSpacing:'.08em', display:'block', marginBottom:8 }}>CONTRASEÑA</label>
            <div style={{ display:'flex', background:'#111c2a', border:`1px solid ${error ? 'rgba(239,68,68,.3)' : '#1e2d3d'}`, borderRadius:12, overflow:'hidden', marginBottom:16 }}>
              <input type={show ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)} onKeyDown={handleKey} placeholder="••••••••" autoFocus style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'#f1f5f9', fontSize:16, padding:'13px 14px', fontFamily:'inherit' }} />
              <button onClick={() => setShow(!show)} style={{ background:'transparent', border:'none', color:'#475569', padding:'0 14px', cursor:'pointer', fontSize:16 }}>{show ? '🙈' : '👁️'}</button>
            </div>
            {error && <p style={{ fontSize:12, color:'#f87171', marginBottom:14, textAlign:'center' }}>✕ Contraseña incorrecta</p>}
            <button onClick={handleSubmit} disabled={!pass.trim() || loading} style={{ width:'100%', padding:'13px', background: pass.trim() ? 'linear-gradient(135deg,#25d366,#128c7e)' : '#1a2535', border:'none', borderRadius:12, color: pass.trim() ? '#fff' : '#334155', fontSize:15, fontWeight:800, cursor: pass.trim() ? 'pointer' : 'default', fontFamily:'inherit', transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              {loading ? <><div style={{ width:16, height:16, border:'2px solid rgba(255,255,255,.3)', borderTop:'2px solid #fff', borderRadius:'50%', animation:'spin .7s linear infinite' }} />Verificando...</> : 'Entrar →'}
            </button>
          </div>
          <p style={{ textAlign:'center', marginTop:20, fontSize:11, color:'#1e2d3d' }}>WhatsApp Business Inbox · Solo acceso autorizado</p>
        </div>
      </div>
    </>
  )
}