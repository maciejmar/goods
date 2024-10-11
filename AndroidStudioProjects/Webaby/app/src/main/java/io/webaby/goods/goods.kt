package io.webaby.goods

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import android.widget.RelativeLayout

class goods : AppCompatActivity() {

    private lateinit var usernameEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var loginButton: Button
    private lateinit var errorMessageTextView: TextView

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)  // Linking the layout

        // Find UI elements by their IDs
        usernameEditText = findViewById(R.id.username)
        passwordEditText = findViewById(R.id.password)
        loginButton = findViewById(R.id.login_button)
        errorMessageTextView = findViewById(R.id.error_message)

        // Handle login button click
        loginButton.setOnClickListener {
            handleLogin()
        }
    }

    private fun handleLogin() {
        val username = usernameEditText.text.toString().trim()
        val password = passwordEditText.text.toString().trim()

        if (username.isEmpty() || password.isEmpty()) {
            showErrorMessage("Username and Password cannot be empty")
        } else if (username == "admin" && password == "password") {
            showErrorMessage("Login successful")
            // Navigate to another screen or perform another action
        } else {
            showErrorMessage("Invalid Username or Password")
        }
    }

    private fun showErrorMessage(message: String) {
        errorMessageTextView.text = message
        errorMessageTextView.visibility = View.VISIBLE
    }
}
