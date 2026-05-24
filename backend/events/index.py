import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """API для афиши: GET — список событий, POST — создать (с паролем), DELETE — удалить (с паролем)."""

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

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, title, description, category, event_date, venue, price, image_url FROM events ORDER BY event_date ASC")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        events = [
            {
                'id': r[0],
                'title': r[1],
                'description': r[2],
                'category': r[3],
                'event_date': r[4].isoformat() if r[4] else None,
                'venue': r[5],
                'price': r[6],
                'image_url': r[7],
            }
            for r in rows
        ]
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(events, ensure_ascii=False)}

    admin_password = headers.get('x-admin-password') or headers.get('X-Admin-Password', '')
    if admin_password != os.environ.get('ADMIN_PASSWORD', ''):
        return {'statusCode': 403, 'headers': cors, 'body': json.dumps({'error': 'Неверный пароль'})}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        title = (body.get('title') or '').strip()
        description = (body.get('description') or '').strip()
        category = body.get('category', 'event')
        event_date = body.get('event_date')
        venue = body.get('venue', '')
        price = body.get('price', '')
        image_url = body.get('image_url', None)

        if not title or not description or not event_date or category not in ('theatre', 'concert', 'cinema', 'event'):
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Заполните обязательные поля'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO events (title, description, category, event_date, venue, price, image_url) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (title, description, category, event_date, venue, price, image_url),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'id': new_id})}

    if method == 'DELETE':
        body = json.loads(event.get('body') or '{}')
        event_id = body.get('id')
        if not event_id:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Укажите id'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute("DELETE FROM events WHERE id = %s", (event_id,))
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
