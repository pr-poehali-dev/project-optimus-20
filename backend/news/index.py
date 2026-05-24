import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """API для новостей: GET — список, POST — создать (с паролем), DELETE — удалить (с паролем)."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    method = event.get('httpMethod', 'GET')
    headers = event.get('headers') or {}
    cors = {'Access-Control-Allow-Origin': '*'}

    # GET — публичный список новостей
    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, title, content, category, status, image_url, created_at FROM news ORDER BY created_at DESC")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        news = [
            {
                'id': r[0],
                'title': r[1],
                'content': r[2],
                'category': r[3],
                'status': r[4],
                'image_url': r[5],
                'created_at': r[6].isoformat() if r[6] else None,
            }
            for r in rows
        ]
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(news, ensure_ascii=False)}

    # Проверка пароля для POST и DELETE
    admin_password = headers.get('x-admin-password') or headers.get('X-Admin-Password', '')
    if admin_password != os.environ.get('ADMIN_PASSWORD', ''):
        return {'statusCode': 403, 'headers': cors, 'body': json.dumps({'error': 'Неверный пароль'})}

    # POST — создать новость
    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        title = (body.get('title') or '').strip()
        content = (body.get('content') or '').strip()
        category = (body.get('category') or 'Городские новости').strip()
        status = body.get('status', 'done')
        image_url = body.get('image_url', None)

        if not title or not content:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Заполните заголовок и текст'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO news (title, content, category, status, image_url) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (title, content, category, status, image_url),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'id': new_id})}

    # DELETE — удалить новость
    if method == 'DELETE':
        body = json.loads(event.get('body') or '{}')
        news_id = body.get('id')
        if not news_id:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Укажите id'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute("DELETE FROM news WHERE id = %s", (news_id,))
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
